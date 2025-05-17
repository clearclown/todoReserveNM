# Development Containers for Todo App

This directory contains development container configurations for frontend, backend, and full-stack developers, allowing for a consistent, isolated development environment.

## Available Configurations

### Frontend Development
Located in `.devcontainer/frontend/`
- React/Next.js development environment
- Tailwind CSS support
- Node.js LTS with pnpm
- All required VS Code extensions

### Backend Development
Located in `.devcontainer/backend/`
- NestJS development environment
- PostgreSQL database
- Node.js LTS with pnpm
- Database client tools
- All required VS Code extensions

### Full-Stack Development
Located in `.devcontainer/fullstack/`
- Complete development environment for both frontend and backend
- Combined set of extensions and tools for full-stack development
- PostgreSQL database
- Node.js LTS with pnpm

## Usage

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` in the root directory (if not already created)
3. Open the project in VS Code
4. Choose your development focus:
   - For frontend developers: `Ctrl+Shift+P` → "Dev Containers: Open Folder in Container..." → select the project root → choose `.devcontainer/frontend`
   - For backend developers: `Ctrl+Shift+P` → "Dev Containers: Open Folder in Container..." → select the project root → choose `.devcontainer/backend`
   - For full-stack developers: `Ctrl+Shift+P` → "Dev Containers: Open Folder in Container..." → select the project root → choose `.devcontainer/fullstack`

5. Wait for the container to build and initialize

## Environment Variables

The development containers use the following default environment variables:

### Backend/Full-Stack
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=todo_dev
APP_PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@db:5432/todo_dev
```

### Frontend
```
VITE_API_URL=http://localhost:3000
NODE_ENV=development
```

You can customize these by creating a `.env` file in the project root.

## Extensions Included

### Frontend
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript support
- React tools
- Docker tools

### Backend
- ESLint
- Prettier
- TypeScript support
- Prisma
- PostgreSQL tools
- REST Client
- Docker tools

### Full-Stack
- All frontend and backend extensions
- GitLens
- Nx Console
- EditorConfig

## Debugging

- Frontend debugging is available through the browser's developer tools.
- Backend debugging is configured with the VS Code Node.js debugger.
- Both backend and full-stack containers expose port 9229 for remote debugging.

## Running Services

### Frontend Container
Frontend service automatically starts with:
```
pnpm nx serve frontend
```

### Backend Container
Backend service automatically starts with:
```
pnpm nx serve backend
```

### Full-Stack Container
In the full-stack container, you need to manually start services as needed:

For backend:
```
pnpm nx serve backend
```

For frontend:
```
pnpm nx serve frontend
```

This allows you to work on either service independently or run both simultaneously.
