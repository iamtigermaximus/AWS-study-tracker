#!/bin/bash

# Create all directories
mkdir -p src/app/api/concept-note
mkdir -p src/app/api/curriculum
mkdir -p src/app/api/practice-exam
mkdir -p src/app/api/projects
mkdir -p src/app/api/study-session
mkdir -p src/app/notes
mkdir -p src/app/practice
mkdir -p src/app/projects
mkdir -p src/app/topics/[topicNumber]
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/styles
mkdir -p prisma
mkdir -p scripts

# Create all files
touch src/app/layout.tsx
touch src/app/page.tsx
touch src/app/notes/page.tsx
touch src/app/practice/page.tsx
touch src/app/projects/page.tsx
touch src/app/topics/page.tsx
touch src/app/topics/[topicNumber]/page.tsx
touch src/app/api/concept-note/route.ts
touch src/app/api/curriculum/route.ts
touch src/app/api/practice-exam/route.ts
touch src/app/api/projects/route.ts
touch src/app/api/study-session/route.ts
touch src/components/Navbar.tsx
touch src/lib/prisma.ts
touch src/lib/registry.tsx
touch src/styles/GlobalStyles.ts
touch src/styles/index.ts
touch prisma/schema.prisma
touch scripts/seed.ts
touch .env
touch .gitignore

echo "All files created successfully!"
echo ""
echo "Now run: npm install"
echo "Then copy the code from the previous responses into each file"
