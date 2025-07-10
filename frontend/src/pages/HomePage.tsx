import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  ArrowRight, 
  Brain, 
  BookOpen, 
  Users, 
  TrendingUp,
  Star,
  Play,
  CheckCircle,
  Zap,
  Globe,
  Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'IA Tutoring Personalizado',
      description: 'Recibe explicaciones adaptadas a tu estilo de aprendizaje con nuestro tutor de inteligencia artificial.',
    },
    {
      icon: BookOpen,
      title: 'Contenido Adaptativo',
      description: 'Cursos que se ajustan automáticamente a tu progreso y nivel de conocimiento.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avanzados',
      description: 'Monitorea tu progreso con métricas detalladas y recomendaciones personalizadas.',
    },
    {
      icon: Users,
      title: 'Aprendizaje Colaborativo',
      description: 'Conecta con otros estudiantes y aprende en comunidad con herramientas colaborativas.',
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Estudiante de Ingeniería',
      content: 'La IA me ayudó a entender conceptos complejos de una manera que nunca había experimentado antes.',
      rating: 5,
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Profesor Universitario',
      content: 'Una herramienta increíble para personalizar la educación. Mis estudiantes han mejorado significativamente.',
      rating: 5,
    },
    {
      name: 'Ana Martínez',
      role: 'Desarrolladora',
      content: 'El sistema de recomendaciones es excelente. Siempre me sugiere el contenido perfecto para mi nivel.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Estudiantes Activos' },
    { number: '500+', label: 'Cursos Disponibles' },
    { number: '95%', label: 'Tasa de Satisfacción' },
    { number: '24/7', label: 'Soporte IA' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Aprende con
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Inteligencia Artificial</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experimenta una educación personalizada con nuestro tutor de IA que se adapta a tu ritmo de aprendizaje y estilo único.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
                >
                  Comenzar Gratis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  <Play className="mr-2 w-5 h-5" />
                  Ver Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Más de 10,000 estudiantes satisfechos</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">IA Tutor Online</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">🤖 <strong>AI Tutor:</strong></p>
                    <p className="text-gray-800">¡Hola! He notado que estás trabajando en álgebra. ¿Te gustaría que te explique este concepto de una manera diferente?</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Sí, explícame
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                      Más tarde
                    </button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">92%</div>
                      <div className="text-xs text-gray-500">Progreso</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">15</div>
                      <div className="text-xs text-gray-500">Racha días</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Características que Transforman el Aprendizaje
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma combina lo mejor de la educación tradicional con tecnología de vanguardia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Comenzar es fácil y rápido
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Regístrate</h3>
              <p className="text-gray-600">Crea tu cuenta gratuita y completa tu perfil de aprendizaje.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Evalúa tu Nivel</h3>
              <p className="text-gray-600">Nuestra IA evalúa tus conocimientos para personalizar tu experiencia.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comienza a Aprender</h3>
              <p className="text-gray-600">Disfruta de una experiencia de aprendizaje completamente personalizada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que Dicen Nuestros Usuarios
            </h2>
            <p className="text-xl text-blue-100">
              Miles de estudiantes han transformado su aprendizaje
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Revolucionar tu Aprendizaje?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de estudiantes que ya están aprendiendo de manera más inteligente con IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Empezar Gratis Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ya tengo cuenta
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            No se requiere tarjeta de crédito • Cancelar en cualquier momento
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
