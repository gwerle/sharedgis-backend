import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RoadsService from '../services/RoadsService';

const roadsRoutes = Router();

roadsRoutes.use(ensureAuthenticated);

roadsRoutes.post('/', async (request, response) => {
  const {
    name,
    map_id,
    way,
    slope,
    paved,
    roadCondition,
    havePublicTransportation,
    notes,
    linestring,
  } = request.body;

  const roadsService = new RoadsService();

  const road = await roadsService.create({
    name,
    map_id,
    way,
    slope,
    paved,
    roadCondition,
    havePublicTransportation,
    notes,
    linestring,
  });

  return response.json(road);
});

roadsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const roadsService = new RoadsService();

  const roads = await roadsService.getByMapId({ map_id });

  return response.json(roads);
});

export default roadsRoutes;
