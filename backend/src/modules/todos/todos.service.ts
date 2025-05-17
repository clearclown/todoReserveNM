import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  // Placeholder for database integration
  private todos: Todo[] = [];
  private nextId = 1;

  // Get all todos for a specific user
  async findAll(userId: number): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.userId === userId);
  }

  // Get a specific todo by ID and check if it belongs to the user
  async findOne(id: number, userId: number): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this todo'
      );
    }

    return todo;
  }

  // Create a new todo
  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      description: createTodoDto.description || '',
      isCompleted: false,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  // Update an existing todo
  async update(
    id: number,
    userId: number,
    updateTodoDto: UpdateTodoDto
  ): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    if (this.todos[todoIndex].userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this todo'
      );
    }

    const updatedTodo = {
      ...this.todos[todoIndex],
      ...updateTodoDto,
      updatedAt: new Date(),
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  // Toggle the completion status of a todo
  async toggleComplete(id: number, userId: number): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    if (this.todos[todoIndex].userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this todo'
      );
    }

    const updatedTodo = {
      ...this.todos[todoIndex],
      isCompleted: !this.todos[todoIndex].isCompleted,
      updatedAt: new Date(),
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  // Delete a todo
  async remove(id: number, userId: number): Promise<void> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    if (this.todos[todoIndex].userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this todo'
      );
    }

    this.todos.splice(todoIndex, 1);
  }
}
