import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Crear usuarios de ejemplo
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lms.com' },
    update: {},
    create: {
      email: 'admin@lms.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Administrador del sistema LMS'
    }
  });

  // Instructor user
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@lms.com' },
    update: {},
    create: {
      email: 'instructor@lms.com',
      username: 'instructor',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      password: hashedPassword,
      role: 'INSTRUCTOR',
      bio: 'Experta en desarrollo web y tecnologías modernas'
    }
  });

  // Student user
  const student = await prisma.user.upsert({
    where: { email: 'student@lms.com' },
    update: {},
    create: {
      email: 'student@lms.com',
      username: 'student',
      firstName: 'Juan',
      lastName: 'Pérez',
      password: hashedPassword,
      role: 'STUDENT',
      bio: 'Estudiante entusiasta de programación'
    }
  });

  // Crear cursos de ejemplo
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Introducción a JavaScript',
      description: 'Aprende los fundamentos de JavaScript desde cero. Este curso te llevará desde conceptos básicos hasta programación avanzada.',
      category: 'Programación',
      level: 'BEGINNER',
      isPublished: true,
      price: 0,
      duration: 1200, // 20 horas
      instructorId: instructor.id,
      thumbnail: 'https://via.placeholder.com/400x300?text=JavaScript+Course'
    }
  });

  const course2 = await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'React Avanzado',
      description: 'Domina React con hooks, context, y patrones avanzados. Construye aplicaciones modernas y escalables.',
      category: 'Desarrollo Web',
      level: 'ADVANCED',
      isPublished: true,
      price: 99.99,
      duration: 1800, // 30 horas
      instructorId: instructor.id,
      thumbnail: 'https://via.placeholder.com/400x300?text=React+Advanced'
    }
  });

  // Crear módulos para el curso de JavaScript
  const module1 = await prisma.module.create({
    data: {
      title: 'Fundamentos de JavaScript',
      description: 'Variables, tipos de datos y operadores',
      order: 1,
      courseId: course1.id
    }
  });

  const module2 = await prisma.module.create({
    data: {
      title: 'Funciones y Objetos',
      description: 'Aprende sobre funciones, objetos y métodos',
      order: 2,
      courseId: course1.id
    }
  });

  // Crear lecciones para el módulo 1
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Variables y Tipos de Datos',
      content: `
# Variables en JavaScript

Las variables son contenedores que almacenan valores de datos. En JavaScript, puedes declarar variables usando \`var\`, \`let\`, o \`const\`.

## Tipos de Variables

### let
Usado para variables que pueden cambiar:
\`\`\`javascript
let nombre = "Juan";
let edad = 25;
\`\`\`

### const
Usado para valores constantes:
\`\`\`javascript
const PI = 3.14159;
const empresa = "TechCorp";
\`\`\`

## Tipos de Datos
- **String**: Texto
- **Number**: Números
- **Boolean**: true/false
- **Array**: Listas
- **Object**: Objetos

¡Practiquemos con algunos ejemplos!
      `,
      type: 'TEXT',
      duration: 30,
      order: 1,
      moduleId: module1.id
    }
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Operadores en JavaScript',
      content: `
# Operadores en JavaScript

Los operadores nos permiten realizar operaciones con variables y valores.

## Operadores Aritméticos
- \`+\` Suma
- \`-\` Resta
- \`*\` Multiplicación
- \`/\` División
- \`%\` Módulo

## Operadores de Comparación
- \`==\` Igual
- \`===\` Estrictamente igual
- \`!=\` No igual
- \`>\` Mayor que
- \`<\` Menor que

¡Hora de practicar!
      `,
      type: 'TEXT',
      duration: 25,
      order: 2,
      moduleId: module1.id
    }
  });

  // Crear actividad de quiz
  const activity1 = await prisma.activity.create({
    data: {
      title: 'Quiz: Variables y Tipos',
      description: 'Evaluación sobre variables y tipos de datos en JavaScript',
      type: 'QUIZ',
      content: {
        questions: [
          {
            question: '¿Cuál es la diferencia entre let y const?',
            options: [
              'No hay diferencia',
              'let es para variables que cambian, const para constantes',
              'const es más rápido',
              'let es obsoleto'
            ],
            correct: 1
          },
          {
            question: '¿Qué tipo de dato es "Hello World"?',
            options: ['Number', 'Boolean', 'String', 'Array'],
            correct: 2
          }
        ]
      },
      maxScore: 100,
      timeLimit: 10,
      attempts: 3,
      courseId: course1.id,
      lessonId: lesson1.id,
      createdBy: instructor.id
    }
  });

  // Inscribir al estudiante en el curso
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      status: 'ACTIVE',
      progress: 25
    }
  });

  // Crear progreso para el estudiante
  await prisma.progress.create({
    data: {
      userId: student.id,
      lessonId: lesson1.id,
      percentage: 100,
      timeSpent: 30,
      isCompleted: true
    }
  });

  await prisma.progress.create({
    data: {
      userId: student.id,
      lessonId: lesson2.id,
      percentage: 50,
      timeSpent: 15,
      isCompleted: false
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`
📊 Created:
- 3 Users (admin, instructor, student)
- 2 Courses
- 2 Modules
- 2 Lessons
- 1 Activity
- 1 Enrollment with progress

🔑 Login credentials:
- Admin: admin@lms.com / password123
- Instructor: instructor@lms.com / password123  
- Student: student@lms.com / password123
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
