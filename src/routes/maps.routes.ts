import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import MapsRepository from '../repositories/MapsRepository';
import CreateMap from '../services/CreateMap';

const mapsRoutes = Router();

mapsRoutes.use(ensureAuthenticated);

mapsRoutes.get('/', async (request, response) => {
  const mapsRepository = getCustomRepository(MapsRepository);
  const maps = await mapsRepository.getByUserId(request.user.id);
  return response.json(maps);
});

mapsRoutes.post('/', async (request, response) => {
  const userId = request.user.id;
  const { mapName } = request.body;
  const createMap = new CreateMap();

  const map = await createMap.execute({
    mapName,
    userId,
  });

  return response.json(map);
});

export default mapsRoutes;
