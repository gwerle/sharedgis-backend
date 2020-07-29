import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    first_name,
    last_name,
    email,
    password,
  }: Request): Promise<User> {
    const usersRespository = getRepository(User);

    const checkUsersExists = await usersRespository.findOne({
      where: { email },
    });

    if (checkUsersExists) {
      throw new AppError('Email already exists!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRespository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await usersRespository.save(user);

    return user;
  }
}

export default CreateUserService;
