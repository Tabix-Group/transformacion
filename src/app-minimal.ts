import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
  const { email, password } = req.body;
  
  // Simulamos registro exitoso
  res.status(201).json({
    success: true,
    data: {
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT'
      },
      token: 'mock-jwt-token'
    }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Simulamos login exitoso
  res.json({
    success: true,
    data: {
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT'
      },
      token: 'mock-jwt-token'
    }
  });
});

// Courses routes
app.get('/api/courses', async (req, res) => {
  const mockCourses = [
    {
      id: '1',
      title: 'Introducción a JavaScript',
      description: 'Aprende JavaScript desde cero',
      category: 'Programación',
      level: 'BEGINNER',
      price: 0,
      instructor: { firstName: 'María', lastName: 'García' }
    },
    {
      id: '2',
      title: 'React Avanzado',
      description: 'Domina React con patrones avanzados',
      category: 'Desarrollo Web',
      level: 'ADVANCED',
      price: 99.99,
      instructor: { firstName: 'Carlos', lastName: 'López' }
    }
  ];

  res.json({ success: true, data: { courses: mockCourses } });
});

// AI Chat endpoint
app.post('/api/ai-agents/chat', async (req, res) => {
  const { query } = req.body;
  
  const response = {
    response: `Como tu tutor de IA, entiendo que preguntas sobre: "${query}". Te ayudo a comprenderlo paso a paso. ¿Qué aspecto específico te gustaría que explique primero?`,
    confidence: 0.9,
    agentUsed: 'Tutor Agent',
    suggestions: ['Ver ejemplos', 'Ejercicios prácticos', 'Conceptos relacionados']
  };

  res.json({ success: true, data: response });
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
