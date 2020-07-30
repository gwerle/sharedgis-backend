import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRoutes;
