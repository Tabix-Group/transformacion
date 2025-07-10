import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Clock, 
  Award, 
  Users,
  Play,
  MoreHorizontal,
  Calendar,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  BarChart3,
  PlusCircle
} from 'lucide-react';

interface DashboardPageProps {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user: authUser, onLogout }) => {
  // Use auth user if available, otherwise fallback to demo data
  const user = authUser || {
    name: 'María González',
    email: 'maria@eduai.com',
    role: 'STUDENT',
    avatar: null
  };

  const [stats] = useState({
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 85,
    streak: 15,
    achievements: 8,
    aiInteractions: 127
  });

  const [recentCourses] = useState([
    {
      id: 1,
      title: 'Introducción a React',
      progress: 75,
      instructor: 'Dr. Carlos Mendoza',
      duration: '4.5 horas',
      nextLesson: 'Hooks Avanzados',
      difficulty: 'Intermedio',
      category: 'Desarrollo Web'
    },
    {
      id: 2,
      title: 'Machine Learning Básico',
      progress: 45,
      instructor: 'Dra. Ana López',
      duration: '8 horas',
      nextLesson: 'Algoritmos de Clasificación',
      difficulty: 'Avanzado',
      category: 'IA & ML'
    },
    {
      id: 3,
      title: 'Diseño UI/UX',
      progress: 90,
      instructor: 'Prof. Roberto Silva',
      duration: '6 horas',
      nextLesson: 'Prototipado Avanzado',
      difficulty: 'Intermedio',
      category: 'Diseño'
    }
  ]);

  const [aiRecommendations] = useState([
    {
      id: 1,
      title: 'Profundiza en TypeScript',
      description: 'Basado en tu progreso en React, te recomendamos este curso para mejorar tus habilidades.',
      type: 'course',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Práctica con Proyectos',
      description: 'Es hora de aplicar lo aprendido. Te sugerimos crear un proyecto personal.',
      type: 'project',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Revisa conceptos de CSS Grid',
      description: 'Detectamos algunas dificultades. Un repaso te ayudará a consolidar el conocimiento.',
      type: 'review',
      priority: 'low'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Webinar: Futuro del Desarrollo Web',
      date: '2025-07-15',
      time: '15:00',
      type: 'webinar'
    },
    {
      id: 2,
      title: 'Examen: React Fundamentals',
      date: '2025-07-18',
      time: '10:00',
      type: 'exam'
    },
    {
      id: 3,
      title: 'Sesión de Mentoría 1:1',
      date: '2025-07-20',
      time: '16:30',
      type: 'mentoring'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'webinar': return <Users className="w-4 h-4" />;
      case 'exam': return <Target className="w-4 h-4" />;
      case 'mentoring': return <Brain className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ¡Bienvenido de vuelta, {user.name}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Continúa tu viaje de aprendizaje donde lo dejaste
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Explorar Cursos</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Ver Progreso
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cursos Completados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.coursesCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Progreso</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.coursesInProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Horas de Estudio</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Racha de Días</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.streak}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Continúa Aprendiendo</h2>
                  <p className="text-gray-600 text-sm">Retoma tus cursos donde los dejaste</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600">por {course.instructor}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                                {course.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {course.duration}
                              </span>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progreso</span>
                            <span className="font-medium text-gray-900">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-gray-600">Siguiente: </span>
                            <span className="font-medium text-gray-900">{course.nextLesson}</span>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Continuar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Recomendaciones de IA</h2>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Sugerencias personalizadas para optimizar tu aprendizaje</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {aiRecommendations.map((recommendation) => (
                      <div key={recommendation.id} className={`border rounded-lg p-4 ${getPriorityColor(recommendation.priority)}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            recommendation.type === 'course' ? 'bg-blue-100' :
                            recommendation.type === 'project' ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            {recommendation.type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                            {recommendation.type === 'project' && <Target className="w-4 h-4 text-green-600" />}
                            {recommendation.type === 'review' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{recommendation.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                              <span>Ver más</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-4">Tu Progreso Semanal</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Lecciones completadas</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Tiempo estudiado</span>
                    <span className="font-bold">8.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Interacciones con IA</span>
                    <span className="font-bold">23</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-white bg-opacity-20 text-white py-2 rounded-lg hover:bg-opacity-30 transition-colors flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Ver Reporte Completo</span>
                </button>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Próximos Eventos</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleDateString('es-ES', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })} - {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todos los eventos
                  </button>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Logros Recientes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Racha de 15 días</p>
                        <p className="text-xs text-gray-500">¡Excelente consistencia!</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Curso Completado</p>
                        <p className="text-xs text-gray-500">JavaScript Fundamentals</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todos los logros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
