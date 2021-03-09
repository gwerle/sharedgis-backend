import { Router } from 'express';
import SidewalkObstacleService from '../services/SidewalkObstacleService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sidewalkObstaclesRoutes = Router();

sidewalkObstaclesRoutes.use(ensureAuthenticated);

sidewalkObstaclesRoutes.post('/', async (request, response) => {
  const { map_id, lat, lng, notes } = request.body;
  const sidewalkObstacleService = new SidewalkObstacleService();

  const sidewalkObstacle = await sidewalkObstacleService.create({
    map_id,
    lat,
    lng,
    notes,
  });

  return response.json(sidewalkObstacle);
});

sidewalkObstaclesRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const sidewalkObstacleService = new SidewalkObstacleService();

  const sidewalkObstacle = await sidewalkObstacleService.getByMapId({
    map_id,
  });

  return response.json(sidewalkObstacle);
});

export default sidewalkObstaclesRoutes;
