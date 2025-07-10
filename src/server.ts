import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

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
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT'
      },
      token: 'mock-jwt-token-12345'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT'
      },
      token: 'mock-jwt-token-12345'
    }
  });
});

// Courses routes
app.get('/api/courses', (req, res) => {
  const mockCourses = [
    {
      id: '1',
      title: 'Introducción a JavaScript',
      description: 'Aprende JavaScript desde cero con ejemplos prácticos',
      category: 'Programación',
      level: 'BEGINNER',
      price: 0,
      thumbnail: 'https://via.placeholder.com/400x300?text=JavaScript',
      instructor: { firstName: 'María', lastName: 'García' },
      enrollments: 150
    },
    {
      id: '2',
      title: 'React Avanzado',
      description: 'Domina React con hooks, context y patrones avanzados',
      category: 'Desarrollo Web',
      level: 'ADVANCED',
      price: 99.99,
      thumbnail: 'https://via.placeholder.com/400x300?text=React',
      instructor: { firstName: 'Carlos', lastName: 'López' },
      enrollments: 89
    },
    {
      id: '3',
      title: 'Node.js y APIs',
      description: 'Construye APIs robustas con Node.js y Express',
      category: 'Backend',
      level: 'INTERMEDIATE',
      price: 79.99,
      thumbnail: 'https://via.placeholder.com/400x300?text=Node.js',
      instructor: { firstName: 'Ana', lastName: 'Martínez' },
      enrollments: 120
    }
  ];

  res.json({ success: true, data: { courses: mockCourses } });
});

// AI Chat endpoint
app.post('/api/ai-agents/chat', (req, res) => {
  const { query } = req.body;
  
  const responses = [
    `Como tu tutor de IA, entiendo que preguntas sobre: "${query}". Te explico paso a paso para que lo comprendas mejor.`,
    `Excelente pregunta sobre "${query}". Como mentor educativo, te ayudo a entenderlo con ejemplos prácticos.`,
    `Interesante consulta: "${query}". Te guío en el aprendizaje con una explicación clara y adaptada a tu nivel.`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  const response = {
    response: randomResponse,
    confidence: Math.random() * 0.3 + 0.7, // Entre 0.7 y 1.0
    agentUsed: ['Tutor Agent', 'Mentor Agent', 'Study Assistant'][Math.floor(Math.random() * 3)],
    suggestions: ['Ver ejemplos prácticos', 'Ejercicios relacionados', 'Conceptos adicionales', 'Documentación']
  };

  res.json({ success: true, data: response });
});

// AI Recommendations endpoint
app.post('/api/ai-agents/recommendations', (req, res) => {
  const mockRecommendations = [
    'Introducción a JavaScript - Perfecto para empezar',
    'HTML y CSS Básico - Fundamentals que necesitas',
    'Git y GitHub - Herramientas esenciales para desarrolladores'
  ];
  
  const response = {
    response: `📚 **Recomendaciones personalizadas:** ${mockRecommendations.join(', ')}`,
    confidence: 0.92,
    agentUsed: 'Content Recommender',
    suggestions: mockRecommendations
  };

  res.json({ success: true, data: response });
});

// User profile mock
app.get('/api/users/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      id: '1',
      email: 'student@test.com',
      firstName: 'Estudiante',
      lastName: 'Demo',
      role: 'STUDENT',
      stats: {
        enrolledCourses: 3,
        completedLessons: 15,
        averageProgress: 68
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`🚀 LMS Server running on port ${port}`);
  console.log(`🔗 API URL: http://localhost:${port}`);
  console.log(`📚 Health check: http://localhost:${port}/health`);
  console.log(`✅ Backend ready for frontend connection!`);
});

export default app;
