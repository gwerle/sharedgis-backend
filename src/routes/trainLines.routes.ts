import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';
import TrainLineService from '../services/TrainLineService';

const trainLinesRoutes = Router();

trainLinesRoutes.use(ensureAuthenticated);

trainLinesRoutes.post('/', async (request, response) => {
  const { map_id, notes, linestring } = request.body;

  const trainLineService = new TrainLineService();

  const trainLine = await trainLineService.create({
    map_id,
    notes,
    linestring,
  });

  return response.json(trainLine);
});

trainLinesRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const trainLineService = new TrainLineService();

  const trainLines = await trainLineService.getByMapId({ map_id });

  return response.json(trainLines);
});

trainLinesRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'train_lines';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default trainLinesRoutes;
