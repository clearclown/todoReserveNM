# Build stage
FROM node:lts-slim AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml* ./
COPY frontend/package.json ./frontend/
RUN npm install -g pnpm
RUN pnpm install

# Install TypeScript and Vite globally
RUN npm install -g typescript
RUN npm install -g vite

# Copy the rest of the application code
COPY . .

# Build the frontend app
WORKDIR /app/frontend
RUN npx tsc && npx vite build

# Production stage with Nginx
FROM nginx:latest

# Copy built assets from the build stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy nginx config
COPY infrastructures/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
