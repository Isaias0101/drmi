#!/bin/bash

# Asegurarse de que la carpeta src existe
mkdir -p src

# --- Archivos de nivel raíz en src ---
touch src/App.css src/App.tsx src/index.css src/main.tsx src/vite-env.d.ts

# --- Crear la carpeta app y sus subdirectorios ---
mkdir -p src/app/auth
mkdir -p src/app/chat
mkdir -p src/app/dashboard/components
mkdir -p src/app/gamification
mkdir -p src/app/quizzes/active
mkdir -p src/app/quizzes/list
mkdir -p src/app/reports/group
mkdir -p src/app/reports/individual
mkdir -p src/app/tasks/review
mkdir -p src/app/tasks/submit

# Archivos en app/
touch src/app/auth/login.tsx
touch src/app/auth/register.tsx
touch src/app/chat/page.tsx
touch src/app/dashboard/page.tsx
touch src/app/gamification/index.tsx
touch src/app/quizzes/active/index.tsx
touch src/app/quizzes/list/index.tsx
touch src/app/reports/group/index.tsx
touch src/app/reports/individual/index.tsx
touch src/app/tasks/review/index.tsx
touch src/app/tasks/submit/index.tsx

# --- Crear la carpeta assets ---
mkdir -p src/assets
touch src/assets/react.svg

# --- Crear la carpeta components y sus subdirectorios ---
mkdir -p src/components/features/ChatBox
mkdir -p src/components/features/QuizCard
mkdir -p src/components/features/TaskSubmission
mkdir -p src/components/layouts/AuthLayout
mkdir -p src/components/layouts/DashboardLayout
mkdir -p src/components/ui/button
mkdir -p src/components/ui/card
mkdir -p src/components/ui/input

# Archivos en components/features/
touch src/components/features/ChatBox/index.tsx
touch src/components/features/QuizCard/index.tsx
touch src/components/features/TaskSubmission/index.tsx

# Archivos en components/layouts/
touch src/components/layouts/AuthLayout/index.tsx
touch src/components/layouts/DashboardLayout/index.tsx

# Archivos en components/ui/
touch src/components/ui/button/index.tsx
touch src/components/ui/card/index.tsx
touch src/components/ui/input/index.tsx

# --- Crear la carpeta lib y sus subdirectorios ---
mkdir -p src/lib/api
mkdir -p src/lib/hooks

# Archivos en lib/api/
touch src/lib/api/auth.ts
touch src/lib/api/quizzes.ts
touch src/lib/api/tasks.ts

# Archivos en lib/hooks/
touch src/lib/hooks/useAuth.ts
touch src/lib/hooks/useQuiz.ts

# --- Crear la carpeta store ---
mkdir -p src/store
touch src/store/authStore.ts
touch src/store/quizStore.ts
touch src/store/userStore.ts

# --- Crear la carpeta types ---
mkdir -p src/types
touch src/types/quiz.ts
touch src/types/task.ts
touch src/types/user.ts

echo "Estructura creada exitosamente."
