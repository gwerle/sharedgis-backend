import { Router } from 'express';
import BikeSupportPointService from '../services/BikeSupportPointService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

const bikeSupportPointsRoutes = Router();

bikeSupportPointsRoutes.use(ensureAuthenticated);

bikeSupportPointsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    havePumpTireBomb,
    haveFoodToSell,
    haveBikeSupportParts,
    lat,
    lng,
    notes,
  } = request.body;
  const bikeSupportPointService = new BikeSupportPointService();

  const bikeSupportPoint = await bikeSupportPointService.create({
    map_id,
    havePumpTireBomb,
    haveFoodToSell,
    haveBikeSupportParts,
    lat,
    lng,
    notes,
  });

  return response.json(bikeSupportPoint);
});

bikeSupportPointsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const bikeSupportPointService = new BikeSupportPointService();

  const bikeSupportPoint = await bikeSupportPointService.getByMapId({
    map_id,
  });

  return response.json(bikeSupportPoint);
});

bikeSupportPointsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'bike_support_points';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default bikeSupportPointsRoutes;
