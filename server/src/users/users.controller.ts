import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Role } from 'src/roles/enums/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
