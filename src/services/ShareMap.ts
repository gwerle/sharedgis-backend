import { getRepository } from 'typeorm';
import Map from '../models/Map';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  mapId: string;
  user: string;
}

class ShareMap {
  public async execute({ mapId, user }: Request): Promise<Map> {
    const mapsRepository = getRepository(Map);
    const usersRespository = getRepository(User);

    const updateMap = await mapsRepository.findOne(mapId, {
      relations: ['users'],
    });

    const findUser = await usersRespository.findOne({
      where: { email: user },
    });

    if (!updateMap) {
      throw new AppError('Mapa não encontrado!');
    }

    if (!findUser) {
      throw new AppError('Esse usuário não existe!');
    }

    const wasAlreadyShared = updateMap.users.some(
      item => item.id === findUser.id,
    );

    if (wasAlreadyShared) {
      throw new AppError('Esse usuário já possui acesso a esse mapa!');
    }

    const newUsers = updateMap.users.concat(findUser);

    updateMap.users = newUsers;

    mapsRepository.save(updateMap);

    return updateMap;
  }
}

export default ShareMap;
