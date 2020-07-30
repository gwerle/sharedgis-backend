import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class CreateUserService {
  public async execute({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: Request): Promise<User> {
    const usersRespository = getRepository(User);

    if (password !== confirmPassword) {
      throw new AppError('Senhas não conferem!');
    }

    const checkUsersExists = await usersRespository.findOne({
      where: { email },
    });

    if (checkUsersExists) {
      throw new AppError('Esse e-mail já foi cadastrado!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRespository.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });

    await usersRespository.save(user);

    return user;
  }
}

export default CreateUserService;
