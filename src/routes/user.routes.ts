import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler, createError } from '../middlewares/error.middleware';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/users/profile
 * Obtiene el perfil del usuario autenticado
 */
router.get('/profile', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      avatar: true,
      bio: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
          instructorCourses: true,
          submissions: true
        }
      }
    }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    success: true,
    data: user
  });
}));

/**
 * PUT /api/users/profile
 * Actualiza el perfil del usuario
 */
router.put('/profile', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, bio, avatar } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio && { bio }),
      ...(avatar && { avatar })
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      avatar: true,
      bio: true,
      updatedAt: true
    }
  });

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
}));

/**
 * GET /api/users/dashboard
 * Dashboard personalizado del usuario
 */
router.get('/dashboard', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  // Obtener estadísticas del usuario
  const [enrollments, progress, recentActivities] = await Promise.all([
    // Cursos en los que está inscrito
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            category: true,
            level: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: { enrolledAt: 'desc' },
      take: 5
    }),

    // Progreso general
    prisma.progress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { lastAccess: 'desc' },
      take: 10
    }),

    // Actividades recientes
    prisma.submission.findMany({
      where: { userId },
      include: {
        activity: {
          select: {
            title: true,
            type: true
          }
        },
        lesson: {
          select: {
            title: true,
            module: {
              select: {
                course: {
                  select: {
                    title: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { submittedAt: 'desc' },
      take: 5
    })
  ]);

  // Calcular estadísticas
  const totalEnrollments = enrollments.length;
  const averageProgress = progress.length > 0 
    ? progress.reduce((sum: number, p: any) => sum + p.percentage, 0) / progress.length 
    : 0;
  const completedLessons = progress.filter((p: any) => p.isCompleted).length;

  res.json({
    success: true,
    data: {
      stats: {
        totalEnrollments,
        averageProgress: Math.round(averageProgress),
        completedLessons,
        recentSubmissions: recentActivities.length
      },
      enrollments,
      recentProgress: progress.slice(0, 5),
      recentActivities
    }
  });
}));

/**
 * GET /api/users (Admin only)
 * Lista todos los usuarios
 */
router.get('/', 
  authenticateToken, 
  authorizeRoles('ADMIN'), 
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, role, search } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { username: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              enrollments: true,
              instructorCourses: true
            }
          }
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  })
);

export default router;
