import { Router } from 'express';
import BikeParkService from '../services/BikeParkService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

const bikeParksRoutes = Router();

bikeParksRoutes.use(ensureAuthenticated);

bikeParksRoutes.post('/', async (request, response) => {
  const { map_id, bikeRacksCondition, lat, lng, notes } = request.body;
  const bikeParkSerivice = new BikeParkService();

  const bikePark = await bikeParkSerivice.create({
    map_id,
    bikeRacksCondition,
    lat,
    lng,
    notes,
  });

  return response.json(bikePark);
});

bikeParksRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const bikeParkSerivice = new BikeParkService();

  const bikePark = await bikeParkSerivice.getByMapId({
    map_id,
  });

  return response.json(bikePark);
});

bikeParksRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'bike_parks';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default bikeParksRoutes;
