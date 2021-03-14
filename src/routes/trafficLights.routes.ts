import { Router } from 'express';
import TrafficLightService from '../services/TrafficLightService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

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

trafficLightsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'traffic_lights';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default trafficLightsRoutes;
