import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'LMS API is running!' });
});

// Solo rutas básicas de auth para probar
app.post('/api/auth/test', (req, res) => {
  res.json({ success: true, message: 'Auth test working' });
});

app.listen(port, () => {
  console.log(`🚀 LMS Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📚 Test with: http://localhost:${port}/health`);
});

export default app;
