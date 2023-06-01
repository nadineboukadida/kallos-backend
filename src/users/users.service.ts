// user service with typeorm repository

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['orders'],
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: createUserDTO.email },
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.usersRepository.save({
      ...createUserDTO,
      password: await this.encryptPassword(createUserDTO.password),
    });
  }

  async update(email: string, updateUserDTO: UpdateUserDTO) {
    return this.usersRepository.update({ email: email }, updateUserDTO);
  }

  async findOneHidePassword(email: string) {
    const { password, ...user } = await this.findOne(email);

    return user;
  }
}
