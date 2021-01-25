import { getRepository } from 'typeorm';
import Map from '../models/Map';

interface Request {
  mapName: string;
  userId: string;
}

class CreateMap {
  public async execute({ mapName, userId }: Request): Promise<Map> {
    const mapsRepository = getRepository(Map);

    const map = mapsRepository.create({
      map_name: mapName,
      owner: userId,
      users: [
        {
          id: userId,
        },
      ],
    });

    await mapsRepository.save(map);

    return map;
  }
}

export default CreateMap;
