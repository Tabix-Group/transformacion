import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LMS API is running!',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, username, firstName, lastName, password, role = 'STUDENT' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username: username || email.split('@')[0],
        firstName: firstName || 'User',
        lastName: lastName || 'Name',
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      data: { user, token }
    });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: error.code === 'P2002' ? 'User already exists' : 'Registration failed' 
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Courses routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        instructor: {
          select: { firstName: true, lastName: true }
        },
        _count: {
          select: { enrollments: true }
        }
      }
    });

    res.json({ success: true, data: { courses } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
});

// AI Chat endpoint
app.post('/api/ai-agents/chat', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Simulamos una respuesta de IA
    const response = {
      response: `Entiendo tu pregunta: "${query}". Como tutor de IA, te explico que este es un concepto importante en el aprendizaje. ¿Te gustaría que profundice en algún aspecto específico?`,
      confidence: 0.85,
      agentUsed: 'Tutor Agent',
      suggestions: ['Ver ejemplos', 'Ejercicios prácticos', 'Más información']
    };

    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI service unavailable' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`🚀 LMS Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${port}`);
  console.log(`📚 Health check: http://localhost:${port}/health`);
});

export default app;
