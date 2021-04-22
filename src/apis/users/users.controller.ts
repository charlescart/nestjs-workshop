import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) { }

  @Post() // users
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createUserDto);
  }

  @Get() // users
  findAll(): Promise<User[]> {
    return this._usersService.findAll();
  }

  @Get(':id') // users/:id
  findOne(@Param('id') id: string): Promise<User> {
    return this._usersService.findOne(+id);
  }

  @Patch(':id') // users/:id
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this._usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // users/:id
  remove(@Param('id') id: string): Promise<boolean> {
    return this._usersService.remove(+id);
  }
}
