# 🎓 LMS EduAI Platform 

Una plataforma de gestión de aprendizaje moderna y escalable con integración de agentes de IA educacionales.

## ✨ Características Principales

### 🎯 Sistema LMS Completo
- **Dashboard Interactivo**: Seguimiento de progreso y estadísticas
- **Catálogo de Cursos**: Exploración con filtros y búsqueda avanzada
- **Gestión de Perfil**: Edición completa de datos personales
- **Configuraciones**: Preferencias personalizadas del usuario

### 🤖 Agentes de IA Educacionales
- **Tutor Personal**: Explicaciones adaptativas y personalizadas
- **Recomendador de Contenido**: Sugerencias basadas en el progreso
- **Sistema Extensible**: Arquitectura modular para nuevos agentes
- **AI Agent Manager**: Orquestador inteligente de agentes

### 🔐 Autenticación y Seguridad
- **Sistema de Roles**: Estudiante, Instructor, Administrador
- **JWT Authentication**: Sesiones seguras y persistentes
- **Rutas Protegidas**: Control granular de acceso

### 📊 Analytics y Progreso
- **Tracking Detallado**: Seguimiento del progreso del estudiante
- **Logros y Certificados**: Sistema de reconocimientos
- **Reportes Visuales**: Gráficos y estadísticas interactivas

## 🏗️ Arquitectura

### Backend (Node.js + TypeScript)
```
src/
├── agents/              # Sistema de agentes de IA
│   ├── base-agent.ts    # Clase base para agentes
│   ├── tutor-agent.ts   # Agente tutor personalizado
│   ├── content-recommender-agent.ts
│   └── agent-manager.ts # Orquestador de agentes
├── middlewares/         # Middlewares de Express
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── logger.middleware.ts
├── routes/             # Rutas de la API
│   ├── auth.routes.ts
│   ├── course.routes.ts
│   ├── user.routes.ts
│   └── ai-agent.routes.ts
└── prisma/             # Esquema de base de datos
    ├── schema.prisma
    └── seed.ts
```

### Frontend (React + TypeScript + Tailwind)
```
frontend/src/
├── components/         # Componentes reutilizables
│   └── Layout.tsx     # Layout principal
├── pages/             # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── CoursesPage.tsx
│   ├── ProfilePage.tsx
│   └── SettingsPage.tsx
└── App.tsx            # Configuración de rutas
```

## 🛠️ Stack Tecnológico

### Backend
- **Node.js**: Runtime de JavaScript
- **TypeScript**: Tipado estático
- **Express.js**: Framework web
- **Prisma**: ORM para base de datos
- **SQLite/PostgreSQL**: Base de datos
- **JWT**: Autenticación
- **bcryptjs**: Hashing de contraseñas

### Frontend
- **React 18**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **React Router**: Enrutamiento
- **Axios**: Cliente HTTP
- **Lucide React**: Iconos
- **Vite**: Bundler y servidor de desarrollo

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <your-repo-url>
cd lms-eduai-platform
```

### 2. Instalar dependencias del backend
```bash
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd frontend
npm install
cd ..
```

### 4. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```bash
# Base de datos (SQLite para desarrollo)
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="tu-clave-secreta-jwt-muy-segura"

# OpenAI API (opcional)
OPENAI_API_KEY="tu-api-key-de-openai"
```

### 5. Configurar base de datos
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos iniciales
npx prisma db seed
```

### 6. Ejecutar la aplicación

**Backend** (Puerto 3000):
```bash
npm run dev
```

**Frontend** (Puerto 5173):
```bash
cd frontend
npm run dev
```

## � Credenciales de Prueba

Después de ejecutar el seed, puedes usar estas credenciales:

```
👤 Administrador:
Email: admin@lms.com
Password: password123

👨‍🏫 Instructor:
Email: instructor@lms.com
Password: password123

👨‍🎓 Estudiante:
Email: student@lms.com
Password: password123
```

## 📁 Scripts Disponibles

### Backend
```bash
npm run dev          # Servidor desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Servidor producción
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Sembrar datos
npm run db:studio    # Abrir Prisma Studio
```

### Frontend
```bash
npm run dev          # Servidor desarrollo Vite
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
```

## 🌟 Funcionalidades Implementadas

### ✅ Completadas
- [x] **Autenticación completa** (Login/Register/Logout)
- [x] **Sistema de rutas protegidas**
- [x] **Dashboard interactivo** con estadísticas
- [x] **Catálogo de cursos** con filtros
- [x] **Perfil de usuario** editable
- [x] **Configuraciones del sistema**
- [x] **Layout responsive** profesional
- [x] **Base de datos** configurada con Prisma
- [x] **API RESTful** estructurada
- [x] **Agentes de IA** (base implementada)

### 🚧 En Desarrollo
- [ ] **AI Tutor** funcional con chat
- [ ] **Gestión de cursos** (CRUD completo)
- [ ] **Sistema de notificaciones**
- [ ] **Analytics avanzados**
- [ ] **Integración con OpenAI**

## 🎨 Diseño y UI

- **Diseño Moderno**: Interfaz limpia y profesional
- **Responsive**: Optimizado para móvil, tablet y desktop
- **Tailwind CSS**: Estilos utilitarios y componentes
- **Tema Coherente**: Esquema de colores azul-púrpura
- **Tipografía**: Fuente Inter para máxima legibilidad
- **Animaciones**: Transiciones sutiles y estados de carga

## 🔧 Configuración Adicional

### Base de Datos
- **SQLite**: Para desarrollo local (incluida)
- **PostgreSQL**: Para producción (configurar en .env)

### Agentes de IA
- **OpenAI**: Configurar API key en .env
- **Extensible**: Agregar nuevos agentes en `src/agents/`

### Deployment
- **Backend**: Compatible con Node.js hosting
- **Frontend**: Compatible con Vercel, Netlify, etc.
- **Database**: Configurar PostgreSQL en producción

## 📝 Contribución

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🆘 Soporte

Para soporte o preguntas:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo

---

**¡Hecho con ❤️ y mucho ☕!**

3. **Configurar base de datos**:
```bash
npm run db:generate
npm run db:push
```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

## 🎯 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Agentes de IA
- `POST /api/ai-agents/chat` - Interacción general con agentes
- `POST /api/ai-agents/recommendations` - Recomendaciones personalizadas
- `POST /api/ai-agents/explain` - Explicaciones tutoriales

### Cursos
- `GET /api/courses` - Lista de cursos públicos
- `POST /api/courses/:id/enroll` - Inscripción en curso
- `GET /api/courses/:id/content` - Contenido del curso

### Usuarios
- `GET /api/users/profile` - Perfil del usuario
- `GET /api/users/dashboard` - Dashboard personalizado

## 🤖 Sistema de Agentes de IA

### Tutor Agent
Proporciona explicaciones personalizadas basadas en el nivel del estudiante:
- Adapta el nivel de dificultad
- Genera ejemplos relevantes
- Ofrece sugerencias de seguimiento

### Content Recommender Agent
Recomienda contenido basado en:
- Historial de aprendizaje
- Preferencias del usuario
- Análisis de patrones
- Popularidad y ratings

### Extensibilidad
Agregar nuevos agentes es simple:
```typescript
class NewAgent extends BaseAIAgent {
  constructor() {
    super({
      name: 'New Agent',
      type: AIAgentType.NEW_TYPE,
      // ...configuración
    });
  }

  async process(request: AIRequest): Promise<AIResponse> {
    // Lógica del agente
  }
}
```

## 📊 Modelo de Datos

- **Users**: Estudiantes, instructores y administradores
- **Courses**: Cursos con módulos y lecciones
- **Enrollments**: Inscripciones con progreso
- **Activities**: Tareas, quizzes y proyectos
- **AI Interactions**: Historial de interacciones con IA

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Ejecutar en producción
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema
npm run db:studio    # Abrir Prisma Studio
```

## 🚀 Próximas Características

- [ ] **Agent Builder**: Constructor visual de agentes
- [ ] **Real-time Notifications**: WebSocket para notificaciones
- [ ] **Advanced Analytics**: Dashboard de analytics avanzado
- [ ] **Video Streaming**: Integración con servicios de video
- [ ] **Mobile App**: Aplicación móvil nativa
- [ ] **AI Assessment**: Evaluación automática con IA
- [ ] **Gamification**: Sistema de puntos y badges

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollo Backend**: Sistema de agentes de IA y API
- **Arquitectura**: Diseño escalable y modular
- **IA/ML**: Integración de agentes educacionales

---

⭐ **¡Dale una estrella si este proyecto te resulta útil!**
