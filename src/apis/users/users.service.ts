import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ) { }

  async create(data: CreateUserDto): Promise<User> {
    try {
      let user: User = await this._userRepository.create(data);
      user = await this._userRepository.save(user);

      return user;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this._userRepository.find({ order: { id: 'DESC' } });
      return users;
    } catch ({ message }) {
      throw new BadRequestException(message)
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user: User = await this._userRepository.findOne(id);
      if (!user) throw new BadRequestException('User Not Found!')

      return user;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      let user: User = await this._userRepository.findOne(id);
      if (!user) throw new BadRequestException('User Not Found!');

      this._userRepository.merge(user, updateUserDto);
      user = await this._userRepository.save(user);

      return user;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result: DeleteResult = await this._userRepository.delete(id);
      if (!result.affected) throw new BadRequestException('User Not Found!');

      return true;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }
}
