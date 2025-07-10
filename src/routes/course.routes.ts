import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler, createError } from '../middlewares/error.middleware';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/courses
 * Lista todos los cursos públicos con filtros
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 12, 
    category, 
    level, 
    search,
    sortBy = 'createdAt',
    order = 'desc' 
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  
  const where: any = { isPublished: true };
  
  if (category) where.category = category;
  if (level) where.level = level;
  if (search) {
    where.OR = [
      { title: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } }
    ];
  }

  const orderBy: any = {};
  orderBy[sortBy as string] = order;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            modules: true
          }
        }
      },
      skip,
      take: Number(limit),
      orderBy
    }),
    prisma.course.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }
  });
}));

/**
 * GET /api/courses/my/courses
 * Obtiene los cursos del instructor autenticado
 */
router.get('/my/courses', 
  authenticateToken, 
  authorizeRoles('INSTRUCTOR', 'ADMIN'), 
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const courses = await prisma.course.findMany({
      where: { instructorId: req.user!.id },
      include: {
        _count: {
          select: {
            enrollments: true,
            modules: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: courses
    });
  })
);

/**
 * GET /api/courses/:id
 * Obtiene un curso específico con todos sus detalles
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      instructor: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
          bio: true
        }
      },
      modules: {
        include: {
          lessons: {
            select: {
              id: true,
              title: true,
              type: true,
              duration: true,
              order: true
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      },
      _count: {
        select: {
          enrollments: true
        }
      }
    }
  });

  if (!course) {
    throw createError('Course not found', 404);
  }

  // Si el usuario está autenticado, verificar si está inscrito
  let isEnrolled = false;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      // Extraer userId del token si existe (opcional)
      // Esta lógica se puede mejorar
    } catch (error) {
      // Ignorar errores de token para rutas públicas
    }
  }

  res.json({
    success: true,
    data: {
      ...course,
      isEnrolled
    }
  });
}));

/**
 * POST /api/courses/:id/enroll
 * Inscribirse en un curso
 */
router.post('/:id/enroll', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id: courseId } = req.params;
  const userId = req.user!.id;

  // Verificar que el curso existe y está publicado
  const course = await prisma.course.findUnique({
    where: { id: courseId, isPublished: true }
  });

  if (!course) {
    throw createError('Course not found or not available', 404);
  }

  // Verificar si ya está inscrito
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  });

  if (existingEnrollment) {
    throw createError('Already enrolled in this course', 409);
  }

  // Crear inscripción
  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      status: 'ACTIVE'
    },
    include: {
      course: {
        select: {
          title: true,
          thumbnail: true
        }
      }
    }
  });

  res.status(201).json({
    success: true,
    message: 'Successfully enrolled in course',
    data: enrollment
  });
}));

/**
 * GET /api/courses/:id/content
 * Obtiene el contenido del curso (solo para usuarios inscritos)
 */
router.get('/:id/content', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id: courseId } = req.params;
  const userId = req.user!.id;

  // Verificar inscripción
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  });

  if (!enrollment) {
    throw createError('Not enrolled in this course', 403);
  }

  // Obtener contenido completo con progreso
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              progress: {
                where: { userId }
              },
              activities: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  maxScore: true
                }
              }
            },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  res.json({
    success: true,
    data: course
  });
}));

/**
 * POST /api/courses (Instructor/Admin only)
 * Crear un nuevo curso
 */
router.post('/', 
  authenticateToken, 
  authorizeRoles('INSTRUCTOR', 'ADMIN'), 
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { 
      title, 
      description, 
      category, 
      level, 
      price = 0, 
      thumbnail,
      duration 
    } = req.body;

    if (!title || !description || !category || !level) {
      throw createError('Title, description, category, and level are required', 400);
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        level,
        price,
        thumbnail,
        duration,
        instructorId: req.user!.id
      },
      include: {
        instructor: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  })
);

export default router;
