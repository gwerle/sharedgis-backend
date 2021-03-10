import { Router } from 'express';
import TaxiStopService from '../services/TaxiStopService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const taxiStopsRoutes = Router();

taxiStopsRoutes.use(ensureAuthenticated);

taxiStopsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    haveSeats,
    haveVisualNotification,
    haveSoundNotification,
    accessibleToWheelchair,
    lat,
    lng,
    notes,
  } = request.body;
  const taxiStopService = new TaxiStopService();

  const taxiStop = await taxiStopService.create({
    map_id,
    haveSeats,
    haveVisualNotification,
    haveSoundNotification,
    accessibleToWheelchair,
    lat,
    lng,
    notes,
  });

  return response.json(taxiStop);
});

taxiStopsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const taxiStopService = new TaxiStopService();

  const taxiStop = await taxiStopService.getByMapId({
    map_id,
  });

  return response.json(taxiStop);
});

export default taxiStopsRoutes;
