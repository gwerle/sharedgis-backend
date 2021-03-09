import { Router } from 'express';
import BusStopService from '../services/BusStopService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const busStopsRoutes = Router();

busStopsRoutes.use(ensureAuthenticated);

busStopsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    accessibleToWheelchair,
    haveVisualNotification,
    haveSoundNotification,
    rainCovered,
    haveBusLinesDemonstrations,
    haveSeats,
    lat,
    lng,
    notes,
  } = request.body;
  const busStopService = new BusStopService();

  const busStop = await busStopService.create({
    map_id,
    accessibleToWheelchair,
    haveVisualNotification,
    haveSoundNotification,
    rainCovered,
    haveBusLinesDemonstrations,
    haveSeats,
    lat,
    lng,
    notes,
  });

  return response.json(busStop);
});

busStopsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const busStopService = new BusStopService();

  const busStop = await busStopService.getByMapId({
    map_id,
  });

  return response.json(busStop);
});

export default busStopsRoutes;
