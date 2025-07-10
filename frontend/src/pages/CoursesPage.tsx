import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  Play,
  ChevronDown,
  Award,
  TrendingUp,
  Brain,
  Code,
  Palette,
  Calculator,
  Globe,
  Music
} from 'lucide-react';

interface CoursesPageProps {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  onLogout?: () => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ user: authUser, onLogout }) => {
  // Use auth user if available, otherwise fallback to demo data
  const user = authUser || {
    name: 'María González',
    email: 'maria@eduai.com',
    role: 'STUDENT',
    avatar: null
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen, count: 48 },
    { id: 'programming', name: 'Programación', icon: Code, count: 15 },
    { id: 'design', name: 'Diseño', icon: Palette, count: 12 },
    { id: 'ai', name: 'IA & ML', icon: Brain, count: 8 },
    { id: 'math', name: 'Matemáticas', icon: Calculator, count: 6 },
    { id: 'languages', name: 'Idiomas', icon: Globe, count: 5 },
    { id: 'music', name: 'Música', icon: Music, count: 2 }
  ];

  const levels = ['all', 'Básico', 'Intermedio', 'Avanzado'];

  const courses = [
    {
      id: 1,
      title: 'Introducción a React y TypeScript',
      instructor: 'Dr. Carlos Mendoza',
      category: 'programming',
      level: 'Intermedio',
      duration: '8 horas',
      students: 1250,
      rating: 4.8,
      price: 'Gratis',
      image: '/api/placeholder/300/200',
      description: 'Aprende React y TypeScript desde cero con proyectos prácticos.',
      tags: ['React', 'TypeScript', 'Frontend'],
      enrolled: true,
      progress: 75
    },
    {
      id: 2,
      title: 'Machine Learning con Python',
      instructor: 'Dra. Ana López',
      category: 'ai',
      level: 'Avanzado',
      duration: '12 horas',
      students: 850,
      rating: 4.9,
      price: '$49',
      image: '/api/placeholder/300/200',
      description: 'Domina los algoritmos de ML y aplícalos en proyectos reales.',
      tags: ['Python', 'ML', 'Scikit-learn'],
      enrolled: false,
      progress: 0
    },
    {
      id: 3,
      title: 'Diseño UI/UX Profesional',
      instructor: 'Prof. Roberto Silva',
      category: 'design',
      level: 'Intermedio',
      duration: '10 horas',
      students: 2100,
      rating: 4.7,
      price: '$29',
      image: '/api/placeholder/300/200',
      description: 'Crea interfaces atractivas y experiencias de usuario excepcionales.',
      tags: ['Figma', 'UI', 'UX'],
      enrolled: true,
      progress: 90
    },
    {
      id: 4,
      title: 'JavaScript Avanzado y ES6+',
      instructor: 'María García',
      category: 'programming',
      level: 'Avanzado',
      duration: '15 horas',
      students: 3200,
      rating: 4.6,
      price: '$39',
      image: '/api/placeholder/300/200',
      description: 'Profundiza en JavaScript moderno con patrones avanzados.',
      tags: ['JavaScript', 'ES6', 'Async'],
      enrolled: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Fundamentos de Data Science',
      instructor: 'Dr. Luis Martín',
      category: 'ai',
      level: 'Básico',
      duration: '6 horas',
      students: 1800,
      rating: 4.5,
      price: 'Gratis',
      image: '/api/placeholder/300/200',
      description: 'Introduce al mundo de la ciencia de datos y análisis.',
      tags: ['Python', 'Pandas', 'Matplotlib'],
      enrolled: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Inglés para Programadores',
      instructor: 'Sarah Johnson',
      category: 'languages',
      level: 'Intermedio',
      duration: '20 horas',
      students: 950,
      rating: 4.4,
      price: '$25',
      image: '/api/placeholder/300/200',
      description: 'Mejora tu inglés técnico para el mundo de la programación.',
      tags: ['Inglés', 'Técnico', 'Comunicación'],
      enrolled: false,
      progress: 0
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Catálogo de Cursos</h1>
              <p className="text-xl text-blue-100 mb-8">
                Descubre miles de cursos diseñados para impulsar tu carrera
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar cursos, instructores o temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                              selectedCategory === category.id
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Nivel</h3>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
                            selectedLevel === level
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {level === 'all' ? 'Todos los niveles' : level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedLevel('all');
                      setSearchTerm('');
                    }}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredCourses.length} cursos encontrados
                  </h2>
                  <p className="text-gray-600">
                    {selectedCategory !== 'all' && `Categoría: ${categories.find(c => c.id === selectedCategory)?.name}`}
                    {selectedLevel !== 'all' && ` • Nivel: ${selectedLevel}`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="relevance">Relevancia</option>
                    <option value="rating">Calificación</option>
                    <option value="students">Popularidad</option>
                    <option value="recent">Más recientes</option>
                  </select>
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white opacity-50" />
                      </div>
                      
                      {/* Enrolled Badge */}
                      {course.enrolled && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Inscrito
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-white text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                        {course.price}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Course Info */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                            {course.level}
                          </span>
                          {course.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">por {course.instructor}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      </div>

                      {/* Progress Bar (for enrolled courses) */}
                      {course.enrolled && (
                        <div className="mb-4">
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
                      )}

                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                          course.enrolled
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {course.enrolled ? (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Continuar</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4" />
                            <span>Ver curso</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
                  <p className="text-gray-600 mb-4">
                    Intenta cambiar los filtros o términos de búsqueda
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedLevel('all');
                      setSearchTerm('');
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
