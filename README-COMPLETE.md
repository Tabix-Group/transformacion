# 🎓 LMS AI Platform - Sistema de Gestión de Aprendizaje con IA

Un Learning Management System (LMS) escalable e inteligente que integra agentes de IA para proporcionar experiencias de aprendizaje personalizadas.

## 🚀 Características Principales

### 🤖 Agentes de IA Integrados
- **Tutor AI**: Proporciona explicaciones personalizadas y tutoría inteligente
- **Recomendador de Contenido**: Sugiere recursos basados en el progreso del usuario
- **Arquitectura Modular**: Sistema extensible para agregar nuevos agentes

### 👥 Sistema de Usuarios
- **Roles**: ADMIN, INSTRUCTOR, STUDENT
- **Autenticación JWT**: Sistema seguro de autenticación
- **Autorización por Roles**: Control granular de acceso

### 🎯 Tecnologías

#### Backend
- **Node.js** + **TypeScript** + **Express**
- **PostgreSQL** + **Prisma ORM**
- **JWT** para autenticación
- **Arquitectura escalable** con middlewares modulares

#### Frontend
- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** para estilos
- **Axios** para comunicación con API
- **Lucide React** para iconos

## 📁 Estructura del Proyecto

```
lms-ai-platform/
├── src/                          # Backend
│   ├── agents/                   # Agentes de IA
│   │   ├── base-agent.ts        # Clase base para agentes
│   │   ├── tutor-agent.ts       # Agente tutor
│   │   ├── content-recommender-agent.ts
│   │   └── agent-manager.ts     # Orquestador de agentes
│   ├── middlewares/             # Middlewares Express
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── routes/                  # Rutas de API
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── course.routes.ts
│   │   └── ai-agent.routes.ts
│   └── app.ts                   # Aplicación principal
├── frontend/                    # Frontend React
│   ├── src/
│   │   ├── App.tsx             # Componente principal
│   │   ├── main.tsx            # Punto de entrada
│   │   └── index.css           # Estilos globales
│   └── package.json
├── prisma/                     # Base de datos
│   ├── schema.prisma          # Esquema de BD
│   └── seed.ts                # Datos de prueba
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** 18+ y **npm**
- **PostgreSQL** 14+
- **Git**

### 1. Clonar y Configurar Backend

```bash
# Instalar dependencias del backend
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus datos de PostgreSQL:
# DATABASE_URL="postgresql://username:password@localhost:5432/lms_ai_platform"
# JWT_SECRET="tu_jwt_secret_muy_seguro"
# NODE_ENV="development"
# PORT=3000

# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones (opcional, si tienes BD configurada)
npm run db:push

# Sembrar datos de prueba (opcional)
npm run db:seed
```

### 2. Configurar Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install
```

## 🚀 Ejecución

### Desarrollo

1. **Backend** (Puerto 3000):
```bash
# En la raíz del proyecto
npm run dev
```

2. **Frontend** (Puerto 5173):
```bash
# En el directorio frontend/
cd frontend
npx vite
# O alternativamente: npm run dev
```

> **Nota**: Si `npm run dev` no funciona en el frontend, usa `npx vite` directamente.

### Producción

1. **Backend**:
```bash
npm run build
npm start
```

2. **Frontend**:
```bash
cd frontend
npm run build
npm run preview
```

## 🌐 Uso del Sistema

### Acceso a la Aplicación
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

### Características de la Interfaz

#### 🏠 Página Principal
- Página de bienvenida con información del LMS
- Explicación de características de IA
- Botones de registro e inicio de sesión

#### 🔐 Autenticación
- **Registro**: Crear nueva cuenta con email, nombre y contraseña
- **Login**: Iniciar sesión con credenciales existentes
- **Logout**: Cerrar sesión segura

#### 📊 Dashboard
- Panel personalizado según el rol del usuario
- Información del perfil
- Acceso a funcionalidades de IA
- Vista de cursos (próximamente)

#### 🤖 Agentes de IA
- **Prueba del Tutor AI**: Botón para probar el agente tutor
- Respuestas inteligentes y personalizadas
- Integración seamless con la interfaz

## 🔌 API Endpoints

### Autenticación
```
POST /api/auth/register    # Registro de usuario
POST /api/auth/login       # Inicio de sesión
GET  /api/auth/profile     # Perfil del usuario (requiere token)
```

### Usuarios
```
GET    /api/users          # Listar usuarios (ADMIN)
GET    /api/users/:id      # Obtener usuario específico
PUT    /api/users/:id      # Actualizar usuario
DELETE /api/users/:id      # Eliminar usuario (ADMIN)
```

### Cursos
```
GET    /api/courses        # Listar cursos
POST   /api/courses        # Crear curso (INSTRUCTOR/ADMIN)
GET    /api/courses/:id    # Obtener curso específico
PUT    /api/courses/:id    # Actualizar curso
DELETE /api/courses/:id    # Eliminar curso
```

### Agentes de IA
```
GET    /api/ai-agents             # Listar agentes disponibles
POST   /api/ai-agents/process     # Procesar solicitud con agente
GET    /api/ai-agents/:type       # Información de agente específico
```

## 🤖 Sistema de Agentes de IA

### Arquitectura
El sistema utiliza una arquitectura modular donde cada agente hereda de `BaseAIAgent`:

```typescript
abstract class BaseAIAgent {
  abstract canHandle(type: AIAgentType): boolean;
  abstract process(input: string, context?: any): Promise<string>;
}
```

### Agentes Disponibles

#### 1. TutorAgent
- **Propósito**: Proporcionar explicaciones educativas personalizadas
- **Características**: Adapta el nivel de explicación según el contexto del usuario
- **Uso**: Explicar conceptos, resolver dudas, guiar el aprendizaje

#### 2. ContentRecommenderAgent
- **Propósito**: Recomendar contenido educativo relevante
- **Características**: Analiza el progreso y preferencias del usuario
- **Uso**: Sugerir cursos, materiales adicionales, rutas de aprendizaje

### Agregar Nuevos Agentes

1. Crear nueva clase que extienda `BaseAIAgent`
2. Implementar métodos `canHandle()` y `process()`
3. Registrar en `AIAgentManager`
4. Agregar tipo en `AIAgentType`

## 🔒 Seguridad

### Autenticación JWT
- Tokens seguros con expiración
- Middleware de autenticación en rutas protegidas
- Almacenamiento seguro en localStorage (frontend)

### Autorización por Roles
- Control granular de acceso
- Middleware de autorización
- Validación en frontend y backend

### Validación de Datos
- Validación de entrada en todos los endpoints
- Sanitización de datos
- Manejo seguro de errores

## 🚀 Escalabilidad

### Arquitectura Modular
- Separación clara de responsabilidades
- Middlewares reutilizables
- Agentes de IA extensibles

### Base de Datos
- Prisma ORM para consultas eficientes
- Esquema escalable
- Índices optimizados

### Microservicios Ready
- Arquitectura preparada para microservicios
- APIs RESTful bien definidas
- Configuración flexible

## 🧪 Testing

### API Testing
```bash
# Usar el archivo test-api.ts incluido
npm run test:api
```

### Endpoints de Prueba
- Health check: `GET /health`
- Registro: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- AI Agents: `POST /api/ai-agents/process`

## 📋 Scripts Disponibles

### Backend
```bash
npm run dev          # Desarrollo con nodemon
npm run build        # Compilar TypeScript
npm start           # Ejecutar en producción
npm run db:generate # Generar cliente Prisma
npm run db:push     # Aplicar cambios de esquema
npm run db:migrate  # Ejecutar migraciones
npm run db:studio   # Abrir Prisma Studio
npm run db:seed     # Sembrar datos de prueba
```

### Frontend
```bash
cd frontend
npm run dev         # Desarrollo con Vite
npm run build       # Construir para producción
npm run preview     # Preview de build de producción
```

## 📝 Próximas Características

- [ ] Sistema completo de cursos y lecciones
- [ ] Chat en tiempo real con IA
- [ ] Analytics avanzados de aprendizaje
- [ ] Gamificación (puntos, badges, leaderboards)
- [ ] Integración con sistemas externos
- [ ] App móvil
- [ ] Notificaciones push
- [ ] Videoconferencias integradas

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la branch (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 Licencia

MIT License - ver archivo `LICENSE` para detalles.

## 🆘 Soporte

Para problemas o preguntas:
1. Revisar la documentación
2. Verificar logs del servidor
3. Comprobar configuración de base de datos
4. Crear issue en el repositorio

---

**¡Construido con ❤️ para revolucionar la educación con IA!**
