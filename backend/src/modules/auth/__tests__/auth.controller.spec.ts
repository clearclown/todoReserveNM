import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('test_register_user_success - should register a new user', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expected = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        token: 'dummy-token',
      };

      jest.spyOn(service, 'register').mockResolvedValue(expected);

      const result = await controller.register(registerDto);
      expect(result).toEqual(expected);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('test_login_user_success - should login user and return token', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expected = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        token: 'dummy-token',
      };

      jest.spyOn(service, 'login').mockResolvedValue(expected);

      const result = await controller.login(loginDto);
      expect(result).toEqual(expected);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });

    it('test_login_user_failure - should throw error for invalid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(service, 'login')
        .mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('logout', () => {
    it('test_logout_user_success - should logout user', async () => {
      const expected = { message: 'Successfully logged out' };
      jest.spyOn(service, 'logout').mockResolvedValue(expected);

      const result = await controller.logout();
      expect(result).toEqual(expected);
      expect(service.logout).toHaveBeenCalled();
    });
  });
});
