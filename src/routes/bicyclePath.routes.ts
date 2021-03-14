import { Router } from 'express';
import BicyclePathService from '../services/BicyclePathService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

const bicyclePathRoutes = Router();

bicyclePathRoutes.use(ensureAuthenticated);

bicyclePathRoutes.post('/', async (request, response) => {
  const {
    map_id,
    surfaceSituation,
    bicyclePathType,
    notes,
    linestring,
  } = request.body;
  const bicyclePathService = new BicyclePathService();

  const bicyclePath = await bicyclePathService.create({
    map_id,
    surfaceSituation,
    bicyclePathType,
    notes,
    linestring,
  });

  return response.json(bicyclePath);
});

bicyclePathRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const bicyclePathService = new BicyclePathService();

  const bicyclePath = await bicyclePathService.getByMapId({
    map_id,
  });

  return response.json(bicyclePath);
});

bicyclePathRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'bicycle_paths';

  const accessibilityRamp = await removePointsService.execute(id, layer);

  return response.json(accessibilityRamp);
});

export default bicyclePathRoutes;
