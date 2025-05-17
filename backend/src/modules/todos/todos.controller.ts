import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // In a real app, we would get the userId from the JWT token
  // For this demo, we'll use a fixed userId
  private readonly mockUserId = 1;

  @Get()
  async findAll() {
    return this.todosService.findAll(this.mockUserId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id, this.mockUserId);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(this.mockUserId, createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, this.mockUserId, updateTodoDto);
  }

  @Patch(':id/complete')
  async toggleComplete(@Param('id') id: string) {
    return this.todosService.toggleComplete(+id, this.mockUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.todosService.remove(+id, this.mockUserId);
  }
}
