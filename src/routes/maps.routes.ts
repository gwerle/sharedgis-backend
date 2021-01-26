import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import MapsRepository from '../repositories/MapsRepository';
import CreateMap from '../services/CreateMap';
import ShareMap from '../services/ShareMap';

const mapsRoutes = Router();

mapsRoutes.use(ensureAuthenticated);

mapsRoutes.get('/', async (request, response) => {
  const mapsRepository = getCustomRepository(MapsRepository);
  const maps = await mapsRepository.getByUserId(request.user.id);

  return response.json(maps);
});

mapsRoutes.post('/', async (request, response) => {
  const userId = request.user.id;
  const { mapName, description } = request.body;
  const createMap = new CreateMap();

  const map = await createMap.execute({
    mapName,
    description,
    userId,
  });

  delete map.users;

  return response.json(map);
});

mapsRoutes.put('/:id/share', async (request, response) => {
  const mapId = request.params.id;
  const { user } = request.body;

  const shareMap = new ShareMap();

  const map = await shareMap.execute({
    mapId,
    user,
  });

  return response.json(map);
});

export default mapsRoutes;
