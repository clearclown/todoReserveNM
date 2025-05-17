FROM node:lts-slim

# Install essential tools for development
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    gnupg \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install global development tools
RUN pnpm add -g nx@latest vite@latest typescript@latest

# Set up environment for development
ENV NODE_ENV=development
EXPOSE 5173

# Use non-root user for better security
USER node

# Command to keep the container running
CMD ["sh", "-c", "echo Container is running && tail -f /dev/null"]
