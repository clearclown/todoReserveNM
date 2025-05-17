# Build stage
FROM node:lts-slim AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml* ./
COPY backend/package.json ./backend/
RUN npm install -g pnpm
RUN pnpm install

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of the application code
COPY . .

# Build the backend app
WORKDIR /app/backend
RUN pnpm docker-build

# Production stage
FROM node:lts-slim

ARG APP_PORT=3000
ENV APP_PORT=$APP_PORT
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install production dependencies
COPY --from=build /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=build /app/backend/package.json ./backend/
RUN npm install -g pnpm
RUN pnpm install --prod

# Copy built application from build stage
COPY --from=build /app/backend/dist ./backend/dist

# Set the working directory to the backend folder
WORKDIR /app/backend

EXPOSE ${APP_PORT}

CMD ["node", "dist/main.js"]
