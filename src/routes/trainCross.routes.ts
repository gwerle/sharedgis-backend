import { Router } from 'express';
import TrainCrossService from '../services/TrainCrossService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

const trainCrossRoutes = Router();

trainCrossRoutes.use(ensureAuthenticated);

trainCrossRoutes.post('/', async (request, response) => {
  const {
    map_id,
    haveVisualAlert,
    haveSoundAlert,
    haveFarVisibilityOfTheTrainLine,
    lat,
    lng,
    notes,
  } = request.body;
  const trainCrossService = new TrainCrossService();

  const trainCross = await trainCrossService.create({
    map_id,
    haveVisualAlert,
    haveSoundAlert,
    haveFarVisibilityOfTheTrainLine,
    lat,
    lng,
    notes,
  });

  return response.json(trainCross);
});

trainCrossRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const trainCrossService = new TrainCrossService();

  const trainCross = await trainCrossService.getByMapId({
    map_id,
  });

  return response.json(trainCross);
});

trainCrossRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'train_cross';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default trainCrossRoutes;
