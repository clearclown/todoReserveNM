import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

// Mock data
const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  isCompleted: false,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUserId = 1;

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            toggleComplete: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('test_get_todos - should return an array of todos', async () => {
      const result = [mockTodo];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTodo);

      expect(await controller.findOne('1')).toBe(mockTodo);
      expect(service.findOne).toHaveBeenCalledWith(1, mockUserId);
    });

    it("test_forbidden_access_to_other_user - should throw ForbiddenException when accessing another user's todo", async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new ForbiddenException(
            'You do not have permission to access this todo'
          )
        );

      await expect(controller.findOne('1')).rejects.toThrow(ForbiddenException);
      expect(service.findOne).toHaveBeenCalledWith(1, mockUserId);
    });
  });

  describe('create', () => {
    it('test_create_todo_success - should create a todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockTodo);

      expect(await controller.create(createTodoDto)).toBe(mockTodo);
      expect(service.create).toHaveBeenCalledWith(mockUserId, createTodoDto);
    });

    it('test_create_todo_no_title - should throw error when title is missing', async () => {
      const invalidDto = { description: 'Missing title' } as CreateTodoDto;

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Title is required'));

      await expect(controller.create(invalidDto)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('test_update_todo_success - should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Title',
      };

      jest.spyOn(service, 'update').mockResolvedValue({
        ...mockTodo,
        title: 'Updated Title',
      });

      const result = await controller.update('1', updateTodoDto);
      expect(result.title).toBe('Updated Title');
      expect(service.update).toHaveBeenCalledWith(1, mockUserId, updateTodoDto);
    });
  });

  describe('toggleComplete', () => {
    it('test_toggle_todo_complete - should toggle the completion status', async () => {
      const toggledTodo = { ...mockTodo, isCompleted: true };

      jest.spyOn(service, 'toggleComplete').mockResolvedValue(toggledTodo);

      const result = await controller.toggleComplete('1');
      expect(result.isCompleted).toBe(true);
      expect(service.toggleComplete).toHaveBeenCalledWith(1, mockUserId);
    });
  });

  describe('remove', () => {
    it('test_delete_todo_success - should delete a todo', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1, mockUserId);
    });
  });
});
