# ToDo App

This is a full-stack Todo application built with:

- Frontend: React, Vite, Tailwind CSS
- Backend: NestJS
- Database: PostgreSQL

## Running with Docker

To run the application with Docker, follow these steps:

1. Make sure Docker and Docker Compose are installed on your system

2. Clone the repository:

```bash
git clone <repository-url>
cd todoapp
```

3. Start the application:

```bash
docker compose up -d
```

4. Access the application:

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

5. Stop the application:

```bash
docker compose down
```

## Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

## Features

- User authentication (register, login, logout)
- Todo management (create, read, update, delete)
- Mark todos as complete/incomplete
- Responsive design with Tailwind CSS
