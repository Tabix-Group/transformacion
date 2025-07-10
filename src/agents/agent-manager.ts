import { BaseAIAgent, AIAgentType, AIRequest, AIResponse, AIAgentConfig } from './base-agent';
import { TutorAgent } from './tutor-agent';
import { ContentRecommenderAgent } from './content-recommender-agent';
// Importar otros agentes aquí

export class AIAgentManager {
  private agents: Map<AIAgentType, BaseAIAgent>;
  private fallbackAgent: BaseAIAgent | null = null;

  constructor() {
    this.agents = new Map();
    // No inicializar agentes automáticamente
  }

  // Método para inicializar agentes bajo demanda
  public initializeAgents(): void {
    if (this.agents.size === 0) {
      this.registerAgent(new TutorAgent());
      this.registerAgent(new ContentRecommenderAgent());
      this.fallbackAgent = new TutorAgent(); // Agente por defecto
    }
  }

  private registerAgent(agent: BaseAIAgent): void {
    this.agents.set(agent.getInfo().type, agent);
    console.log(`✅ Registered AI Agent: ${agent.getInfo().name}`);
  }

  /**
   * Procesa una petición del usuario y la dirige al agente más apropiado
   */
  async processRequest(request: AIRequest): Promise<AIResponse & { agentUsed: string }> {
    try {
      // Inicializar agentes si no están cargados
      this.initializeAgents();
      
      // 1. Determinar el mejor agente para la petición
      const selectedAgent = this.selectBestAgent(request);
      
      // 2. Procesar la petición
      const response = await selectedAgent.process(request);
      
      // 3. Registrar la interacción (para analytics y mejoras)
      await this.logInteraction(request, response, selectedAgent.getInfo().name);
      
      return {
        ...response,
        agentUsed: selectedAgent.getInfo().name
      };
    } catch (error) {
      console.error('Error in AIAgentManager:', error);
      
      // Fallback response
      return {
        response: 'Disculpa, tuve un problema procesando tu solicitud. ¿Podrías intentar reformularla?',
        confidence: 0,
        agentUsed: 'Error Handler',
        metadata: { error: true }
      };
    }
  }

  /**
   * Selecciona el mejor agente basado en el tipo de petición
   */
  private selectBestAgent(request: AIRequest): BaseAIAgent {
    // Asegurar que tenemos un fallback
    if (!this.fallbackAgent) {
      this.fallbackAgent = new TutorAgent();
    }

    // Estrategia de selección basada en palabras clave y contexto
    
    // 1. Buscar agentes que explícitamente pueden manejar la petición
    for (const [type, agent] of this.agents) {
      if (agent.canHandle(request)) {
        return agent;
      }
    }

    // 2. Selección basada en palabras clave específicas
    const query = request.query.toLowerCase();
    
    if (this.isRecommendationQuery(query)) {
      return this.agents.get(AIAgentType.CONTENT_RECOMMENDER) || this.fallbackAgent;
    }
    
    if (this.isTutorialQuery(query)) {
      return this.agents.get(AIAgentType.TUTOR) || this.fallbackAgent;
    }

    // 3. Agente por defecto
    return this.fallbackAgent;
  }

  private isRecommendationQuery(query: string): boolean {
    const recommendationKeywords = [
      'recomienda', 'sugerir', 'qué curso', 'qué estudiar',
      'próximo', 'siguiente', 'mejores cursos', 'recomendación'
    ];
    return recommendationKeywords.some(keyword => query.includes(keyword));
  }

  private isTutorialQuery(query: string): boolean {
    const tutorialKeywords = [
      'explica', 'cómo', 'qué es', 'por qué', 'ayuda',
      'no entiendo', 'ejemplo', 'tutorial', 'enseña'
    ];
    return tutorialKeywords.some(keyword => query.includes(keyword));
  }

  /**
   * Obtiene información de todos los agentes disponibles
   */
  getAvailableAgents(): AIAgentConfig[] {
    this.initializeAgents();
    return Array.from(this.agents.values()).map(agent => agent.getInfo());
  }

  /**
   * Obtiene un agente específico por tipo
   */
  getAgent(type: AIAgentType): BaseAIAgent | undefined {
    return this.agents.get(type);
  }

  /**
   * Registra la interacción para analytics y mejoras futuras
   */
  private async logInteraction(
    request: AIRequest, 
    response: AIResponse, 
    agentName: string
  ): Promise<void> {
    try {
      // Aquí podrías guardar en base de datos para analytics
      console.log(`📊 AI Interaction: ${agentName} - Confidence: ${response.confidence}`);
      
      // En una implementación real, guardarías esto en la tabla ai_interactions
      // await prisma.aIInteraction.create({
      //   data: {
      //     userId: request.userId,
      //     type: agentType,
      //     query: request.query,
      //     response: response,
      //     context: request.context
      //   }
      // });
    } catch (error) {
      console.error('Error logging AI interaction:', error);
    }
  }

  /**
   * Permite agregar agentes dinámicamente (para plugins)
   */
  addAgent(agent: BaseAIAgent): void {
    this.registerAgent(agent);
  }

  /**
   * Permite remover agentes dinámicamente
   */
  removeAgent(type: AIAgentType): boolean {
    return this.agents.delete(type);
  }
}

// Singleton instance
export const aiAgentManager = new AIAgentManager();
