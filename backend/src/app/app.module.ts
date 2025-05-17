import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { TodosModule } from '../modules/todos/todos.module';

@Module({
  imports: [AuthModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
