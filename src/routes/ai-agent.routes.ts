import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/error.middleware';
import { aiAgentManager } from '../agents/agent-manager';
import { AIRequest } from '../agents/base-agent';

const router = Router();

/**
 * POST /api/ai-agents/chat
 * Endpoint principal para interactuar con los agentes de IA
 */
router.post('/chat', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { query, context, courseId, lessonId } = req.body;
  
  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Query is required'
    });
  }

  const aiRequest: AIRequest = {
    userId: req.user!.id,
    query,
    context,
    courseId,
    lessonId
  };

  const response = await aiAgentManager.processRequest(aiRequest);

  res.json({
    success: true,
    data: response
  });
}));

/**
 * GET /api/ai-agents
 * Obtiene información de todos los agentes disponibles
 */
router.get('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const agents = aiAgentManager.getAvailableAgents();
  
  res.json({
    success: true,
    data: {
      agents,
      totalAgents: agents.length
    }
  });
}));

/**
 * POST /api/ai-agents/recommendations
 * Endpoint específico para obtener recomendaciones de contenido
 */
router.post('/recommendations', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { courseId, preferences } = req.body;

  const aiRequest: AIRequest = {
    userId: req.user!.id,
    query: 'Recomiéndame cursos basado en mi perfil',
    context: {
      preferences,
      requestType: 'content_recommendation'
    },
    courseId
  };

  const response = await aiAgentManager.processRequest(aiRequest);

  res.json({
    success: true,
    data: response
  });
}));

/**
 * POST /api/ai-agents/explain
 * Endpoint específico para explicaciones y tutoría
 */
router.post('/explain', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { topic, context, difficulty } = req.body;
  
  if (!topic) {
    return res.status(400).json({
      success: false,
      message: 'Topic is required'
    });
  }

  const aiRequest: AIRequest = {
    userId: req.user!.id,
    query: `Explica: ${topic}`,
    context: {
      ...context,
      difficulty,
      requestType: 'explanation'
    }
  };

  const response = await aiAgentManager.processRequest(aiRequest);

  res.json({
    success: true,
    data: response
  });
}));

/**
 * GET /api/ai-agents/history
 * Obtiene el historial de interacciones con IA del usuario
 */
router.get('/history', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  // TODO: Implementar obtención del historial desde la base de datos
  // Por ahora retornamos una respuesta vacía
  
  res.json({
    success: true,
    data: {
      interactions: [],
      totalInteractions: 0,
      message: 'Historial de interacciones disponible próximamente'
    }
  });
}));

export default router;
