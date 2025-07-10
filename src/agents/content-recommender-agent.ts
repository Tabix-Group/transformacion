import { BaseAIAgent, AIAgentType, AIRequest, AIResponse } from './base-agent';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ContentRecommenderAgent extends BaseAIAgent {
  constructor() {
    super({
      name: 'Content Recommender',
      type: AIAgentType.CONTENT_RECOMMENDER,
      description: 'AI agent that recommends personalized learning content',
      capabilities: [
        'content_recommendation',
        'learning_path_optimization',
        'skill_gap_analysis',
        'adaptive_curriculum'
      ],
      settings: {
        recommendationCount: 5,
        similarityThreshold: 0.7,
        diversityFactor: 0.3
      }
    });
  }

  async process(request: AIRequest): Promise<AIResponse> {
    try {
      const recommendations = await this.generateRecommendations(request);
      
      return {
        response: this.formatRecommendations(recommendations),
        confidence: 0.9,
        suggestions: recommendations.map((r: any) => r.title),
        metadata: {
          totalRecommendations: recommendations.length,
          algorithm: 'collaborative_filtering',
          personalizedScore: recommendations[0]?.score || 0
        }
      };
    } catch (error) {
      console.error('Error in ContentRecommenderAgent:', error);
      return {
        response: 'No pude generar recomendaciones personalizadas en este momento.',
        confidence: 0,
        metadata: { error: true }
      };
    }
  }

  private async generateRecommendations(request: AIRequest) {
    // Obtener perfil del usuario
    const userProfile = await this.getUserProfile(request.userId);
    
    // Obtener cursos disponibles
    const availableCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
        enrollments: {
          none: {
            userId: request.userId
          }
        }
      },
      include: {
        instructor: true,
        enrollments: true,
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    });

    // Algoritmo de recomendación simple basado en:
    // 1. Nivel del usuario
    // 2. Categorías de interés
    // 3. Popularidad del curso
    // 4. Rating del instructor
    
    const scoredCourses = availableCourses.map((course: any) => {
      let score = 0;
      
      // Score por nivel apropiado
      if (this.isLevelAppropriate(course.level, userProfile.estimatedLevel)) {
        score += 40;
      }
      
      // Score por categoría de interés
      if (userProfile.interestedCategories.includes(course.category)) {
        score += 30;
      }
      
      // Score por popularidad
      const popularityScore = Math.min((course._count.enrollments / 100) * 20, 20);
      score += popularityScore;
      
      // Score por duración apropiada
      if (course.duration && this.isDurationAppropriate(course.duration, userProfile.availableTime)) {
        score += 10;
      }

      return {
        ...course,
        score,
        reason: this.generateRecommendationReason(course, userProfile, score)
      };
    });

    // Ordenar por score y tomar los mejores
    return scoredCourses
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, this.config.settings.recommendationCount);
  }

  private async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          include: {
            course: true
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

    if (!user) throw new Error('User not found');

    // Analizar patrones de aprendizaje
    const enrolledCategories = user.enrollments.map((e: any) => e.course.category);
    const avgProgress = user.progress.reduce((sum: number, p: any) => sum + p.percentage, 0) / user.progress.length || 0;
    const avgTimeSpent = user.progress.reduce((sum: number, p: any) => sum + p.timeSpent, 0) / user.progress.length || 30;

    // Estimar nivel basado en progreso y cursos completados
    let estimatedLevel = 'BEGINNER';
    if (avgProgress > 70 && user.enrollments.length > 2) estimatedLevel = 'ADVANCED';
    else if (avgProgress > 40 && user.enrollments.length > 1) estimatedLevel = 'INTERMEDIATE';

    return {
      estimatedLevel,
      interestedCategories: [...new Set(enrolledCategories)], // categorías únicas
      availableTime: avgTimeSpent,
      completionRate: avgProgress,
      totalCourses: user.enrollments.length
    };
  }

  private isLevelAppropriate(courseLevel: string, userLevel: string): boolean {
    const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    const courseIndex = levels.indexOf(courseLevel);
    const userIndex = levels.indexOf(userLevel);
    
    // Apropiado si es el mismo nivel o uno superior
    return courseIndex >= userIndex && courseIndex <= userIndex + 1;
  }

  private isDurationAppropriate(courseDuration: number, userAvailableTime: number): boolean {
    // Considerar apropiado si la duración está dentro del rango de tiempo disponible del usuario
    return courseDuration <= userAvailableTime * 10; // Factor de flexibilidad
  }

  private generateRecommendationReason(course: any, profile: any, score: number): string {
    const reasons = [];
    
    if (profile.interestedCategories.includes(course.category)) {
      reasons.push(`te interesa ${course.category}`);
    }
    
    if (this.isLevelAppropriate(course.level, profile.estimatedLevel)) {
      reasons.push(`apropiado para tu nivel ${profile.estimatedLevel.toLowerCase()}`);
    }
    
    if (course._count.enrollments > 50) {
      reasons.push('muy popular entre estudiantes');
    }

    return reasons.length > 0 
      ? `Recomendado porque ${reasons.join(', ')}`
      : 'Podría ser de tu interés';
  }

  private formatRecommendations(recommendations: any[]): string {
    if (recommendations.length === 0) {
      return 'No encontré cursos específicos para recomendar en este momento. Te sugiero explorar nuestro catálogo completo.';
    }

    let response = '📚 **Recomendaciones personalizadas para ti:**\n\n';
    
    recommendations.forEach((course, index) => {
      response += `${index + 1}. **${course.title}**\n`;
      response += `   📊 Nivel: ${course.level}\n`;
      response += `   🎯 ${course.reason}\n`;
      response += `   ⭐ Score: ${course.score.toFixed(1)}/100\n\n`;
    });

    response += '💡 ¿Te interesa alguno de estos cursos? Puedo darte más detalles sobre cualquiera de ellos.';
    
    return response;
  }

  canHandle(request: AIRequest): boolean {
    const recommendationKeywords = [
      'recomienda', 'sugerir', 'qué curso', 'qué estudiar', 
      'próximo', 'siguiente', 'mejores cursos'
    ];
    return recommendationKeywords.some(keyword => 
      request.query.toLowerCase().includes(keyword)
    );
  }
}
