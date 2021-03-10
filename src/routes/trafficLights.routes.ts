import { Router } from 'express';
import TrafficLightService from '../services/TrafficLightService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const trafficLightsRoutes = Router();

trafficLightsRoutes.use(ensureAuthenticated);

trafficLightsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    haveSoundNotification,
    haveCrosswalk,
    lat,
    lng,
    notes,
  } = request.body;
  const trafficLightService = new TrafficLightService();

  const trafficLight = await trafficLightService.create({
    map_id,
    haveSoundNotification,
    haveCrosswalk,
    lat,
    lng,
    notes,
  });

  return response.json(trafficLight);
});

trafficLightsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const trafficLightService = new TrafficLightService();

  const trafficLight = await trafficLightService.getByMapId({
    map_id,
  });

  return response.json(trafficLight);
});

export default trafficLightsRoutes;
