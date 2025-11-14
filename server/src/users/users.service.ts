import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CannotDeleteSelfException } from './exceptions/cannot-delete-self-exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number, withPassword: boolean = false) {
    const selectQueryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });
    if (withPassword) {
      selectQueryBuilder.addSelect('user.password');
    }
    const user = await selectQueryBuilder.getOne();
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findByEmail(
    email: string,
    withPassword?: boolean,
  ): Promise<User | null> {
    const selectQueryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });
    if (withPassword) {
      selectQueryBuilder.addSelect('user.password');
    }
    const user = await selectQueryBuilder.getOne();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findById(id);
  }

  async remove(id: number, authUser: User) {
    await this.findById(id);
    if (authUser.id == id) {
      throw new CannotDeleteSelfException();
    }
    await this.userRepository.delete(id);
  }
}
