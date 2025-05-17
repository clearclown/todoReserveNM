/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS for the frontend
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'http://frontend' // Docker service name in production
        : 'http://localhost:5173', // Dev server in development
    credentials: true,
  });

  // Get port from environment or use default
  const port = process.env.APP_PORT || 3000;

  await app.listen(port, '0.0.0.0'); // Listen on all network interfaces

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
