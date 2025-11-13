/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { EmailInUseException } from 'src/users/exceptions/email-in-use.exception';
import { InvalidCredentialsException } from 'src/users/exceptions/invalid-credentials.exception';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from '../users/dto/login.dto';
import { AuthResponse } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private async generateToken(user: User): Promise<string> {
    return await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      role: user.role,
    });
  }

  async signUp({
    name,
    email,
    password,
  }: CreateUserDto): Promise<AuthResponse> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new EmailInUseException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  async login({ email, password }: LoginDto): Promise<AuthResponse> {
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) {
      throw new InvalidCredentialsException();
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }
    const token = await this.generateToken(existingUser);
    const { password: _, ...userWithoutPassword } = existingUser;
    return { token, user: userWithoutPassword };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userService.findById(id, true);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser != null && existingUser.id !== id) {
        throw new EmailInUseException();
      }
    }
    Object.assign(user, updateUserDto);
    return await this.userService.update(id, user);
  }
}
