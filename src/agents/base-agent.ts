export enum AIAgentType {
  TUTOR = 'TUTOR',
  MENTOR = 'MENTOR',
  ASSESSOR = 'ASSESSOR',
  CONTENT_RECOMMENDER = 'CONTENT_RECOMMENDER',
  STUDY_PLANNER = 'STUDY_PLANNER'
}

export interface AIAgentConfig {
  name: string;
  type: AIAgentType;
  description: string;
  capabilities: string[];
  settings: Record<string, any>;
}

export interface AIRequest {
  userId: string;
  query: string;
  context?: Record<string, any>;
  courseId?: string;
  lessonId?: string;
}

export interface AIResponse {
  response: string;
  confidence: number;
  suggestions?: string[];
  metadata?: Record<string, any>;
}

export abstract class BaseAIAgent {
  protected config: AIAgentConfig;

  constructor(config: AIAgentConfig) {
    this.config = config;
  }

  abstract process(request: AIRequest): Promise<AIResponse>;

  // Método para validar si el agente puede manejar la petición
  canHandle(request: AIRequest): boolean {
    return true; // Override en agentes específicos
  }

  // Método para obtener información del agente
  getInfo(): AIAgentConfig {
    return this.config;
  }
}
