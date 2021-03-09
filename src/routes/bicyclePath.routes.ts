import { Router } from 'express';
import BicyclePathService from '../services/BicyclePathService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

export default bicyclePathRoutes;
