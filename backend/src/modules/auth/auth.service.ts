import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // Placeholder for database integration
  private users = [];

  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingUser = this.users.find(
      (user) => user.email === registerDto.email
    );
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // In a real application, the password would be hashed here
    const newUser = {
      id: this.users.length + 1,
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password, // In real app, this would be hashed
    };

    this.users.push(newUser);

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: 'dummy-token', // In real app, this would be a JWT
    };
  }

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = this.users.find((user) => user.email === loginDto.email);

    // Check if user exists and password matches
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token: 'dummy-token', // In real app, this would be a JWT
    };
  }

  async logout() {
    // In a real application, this would invalidate the token or session
    return { message: 'Successfully logged out' };
  }
}
