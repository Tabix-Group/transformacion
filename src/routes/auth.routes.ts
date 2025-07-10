import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, createError } from '../middlewares/error.middleware';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/auth/register
 * Registro de nuevos usuarios
 */
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { email, username, firstName, lastName, password, role = 'STUDENT' } = req.body;

  // Validaciones básicas
  if (!email || !username || !firstName || !lastName || !password) {
    throw createError('All fields are required', 400);
  }

  if (password.length < 6) {
    throw createError('Password must be at least 6 characters', 400);
  }

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });

  if (existingUser) {
    throw createError('User with this email or username already exists', 409);
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 12);

  // Crear usuario
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
      role
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true
    }
  });

  // Generar JWT - Register
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
}));

/**
 * POST /api/auth/login
 * Autenticación de usuarios
 */
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError('Email and password are required', 400);
  }

  // Buscar usuario
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.isActive) {
    throw createError('Invalid credentials', 401);
  }

  // Verificar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError('Invalid credentials', 401);
  }

  // Generar JWT - Login
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar
      },
      token
    }
  });
}));

/**
 * POST /api/auth/forgot-password
 * Solicitud de recuperación de contraseña
 */
router.post('/forgot-password', asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw createError('Email is required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  // Por seguridad, siempre retornamos éxito
  res.json({
    success: true,
    message: 'If the email exists, you will receive a password reset link'
  });

  // TODO: Implementar envío de email con token de recuperación
  if (user) {
    console.log(`Password reset requested for user: ${user.email}`);
    // Aquí implementarías el envío de email
  }
}));

export default router;
