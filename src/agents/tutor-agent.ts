import { BaseAIAgent, AIAgentType, AIRequest, AIResponse, AIAgentConfig } from './base-agent';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TutorAgent extends BaseAIAgent {
  constructor() {
    super({
      name: 'Personal Tutor',
      type: AIAgentType.TUTOR,
      description: 'AI tutor that provides personalized explanations and guidance',
      capabilities: [
        'explain_concepts',
        'answer_questions',
        'provide_examples',
        'adaptive_teaching'
      ],
      settings: {
        maxResponseLength: 500,
        personalityTrait: 'encouraging',
        difficultyAdaptation: true
      }
    });
  }

  async process(request: AIRequest): Promise<AIResponse> {
    try {
      // Obtener contexto del usuario y curso
      const userContext = await this.getUserContext(request.userId, request.courseId);
      
      // Simular procesamiento de IA (aquí conectarías con OpenAI, Claude, etc.)
      const response = await this.generateTutorResponse(request, userContext);

      return {
        response: response.text,
        confidence: response.confidence,
        suggestions: response.suggestions,
        metadata: {
          responseTime: Date.now(),
          tokensUsed: response.tokensUsed,
          userLevel: userContext.level
        }
      };
    } catch (error) {
      console.error('Error in TutorAgent:', error);
      return {
        response: 'Lo siento, no pude procesar tu consulta en este momento. Por favor, intenta de nuevo.',
        confidence: 0,
        metadata: { error: true }
      };
    }
  }

  private async getUserContext(userId: string, courseId?: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          where: courseId ? { courseId } : undefined,
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: {
                      include: {
                        progress: {
                          where: { userId }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        progress: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Determinar nivel del estudiante basado en progreso
    const completedLessons = user?.progress.filter((p: any) => p.isCompleted).length || 0;
    const totalLessons = user?.progress.length || 1;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    let level = 'beginner';
    if (progressPercentage > 70) level = 'advanced';
    else if (progressPercentage > 30) level = 'intermediate';

    return {
      level,
      progressPercentage,
      recentActivity: user?.progress.slice(-5) || [],
      enrolledCourses: user?.enrollments.length || 0
    };
  }

  private async generateTutorResponse(request: AIRequest, userContext: any) {
    // Aquí integrarías con OpenAI, Claude, o tu modelo preferido
    // Por ahora simularemos la respuesta
    
    const prompts = {
      beginner: `Eres un tutor personal amigable y paciente. El estudiante es principiante.
        Pregunta: "${request.query}"
        Contexto: ${JSON.stringify(request.context)}
        
        Proporciona una explicación clara, paso a paso, usando analogías simples.`,
      
      intermediate: `Eres un tutor experto. El estudiante tiene conocimientos intermedios.
        Pregunta: "${request.query}"
        Contexto: ${JSON.stringify(request.context)}
        
        Proporciona una explicación detallada con ejemplos prácticos.`,
      
      advanced: `Eres un mentor técnico. El estudiante es avanzado.
        Pregunta: "${request.query}"
        Contexto: ${JSON.stringify(request.context)}
        
        Proporciona una respuesta técnica profunda con referencias adicionales.`
    };

    // Simular respuesta de IA
    const responses = {
      beginner: {
        text: `Entiendo tu pregunta sobre "${request.query}". Te explico paso a paso: 
               1. Primero, es importante entender que...
               2. Luego, piensa en esto como...
               3. Finalmente, para aplicarlo...
               
               ¿Te gustaría que profundice en algún punto específico?`,
        confidence: 0.85,
        suggestions: ['Ver ejemplos prácticos', 'Ejercicios relacionados', 'Conceptos previos'],
        tokensUsed: 150
      },
      intermediate: {
        text: `Excelente pregunta sobre "${request.query}". Basándome en tu progreso actual:
               
               El concepto clave aquí es... con aplicaciones en...
               Un ejemplo práctico sería...
               
               Para dominar esto completamente, te recomiendo practicar con...`,
        confidence: 0.92,
        suggestions: ['Proyecto práctico', 'Casos de estudio', 'Documentación avanzada'],
        tokensUsed: 200
      },
      advanced: {
        text: `Interesante consulta sobre "${request.query}". Considerando tu nivel avanzado:
               
               Las implicaciones técnicas incluyen...
               Alternativas a considerar...
               Best practices en la industria...
               
               Te sugiero explorar también...`,
        confidence: 0.88,
        suggestions: ['Investigación adicional', 'Implementación avanzada', 'Optimizaciones'],
        tokensUsed: 250
      }
    };

    return responses[userContext.level as keyof typeof responses] || responses.beginner;
  }

  canHandle(request: AIRequest): boolean {
    // El tutor puede manejar preguntas generales y explicaciones
    const tutorKeywords = ['qué', 'cómo', 'por qué', 'explica', 'ayuda', 'no entiendo'];
    return tutorKeywords.some(keyword => request.query.toLowerCase().includes(keyword));
  }
}
