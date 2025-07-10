# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

Este es un proyecto de LMS (Learning Management System) educativo escalable con integración de agentes de IA.

## Arquitectura del Proyecto

- **Backend**: Node.js + TypeScript + Express
- **Base de datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT con roles (ADMIN, INSTRUCTOR, STUDENT)
- **Agentes de IA**: Sistema modular con agentes especializados
- **Arquitectura**: Microservicios escalable

## Estructura de Agentes de IA

Los agentes siguen el patrón de la clase `BaseAIAgent`:
- `TutorAgent`: Explicaciones personalizadas y tutoría
- `ContentRecommenderAgent`: Recomendaciones de contenido
- `AIAgentManager`: Orquestador de agentes

## Convenciones de Código

- Usar TypeScript estricto
- Todas las rutas de API deben usar `asyncHandler` para manejo de errores
- Autenticación requerida para rutas protegidas con `authenticateToken`
- Autorización por roles con `authorizeRoles`
- Usar Prisma para todas las consultas de base de datos
- Respuestas de API consistentes con formato `{ success: boolean, data?: any, message?: string }`

## Mejores Prácticas

- Validar entradas en todos los endpoints
- Usar transacciones de Prisma para operaciones complejas
- Implementar logging apropiado
- Manejar errores de manera consistente
- Usar tipos TypeScript para todas las interfaces

## Agentes de IA

Al crear nuevos agentes:
1. Extender `BaseAIAgent`
2. Implementar el método `process()`
3. Definir `canHandle()` para routing inteligente
4. Registrar en `AIAgentManager`
5. Agregar tipos apropiados en `AIAgentType`
