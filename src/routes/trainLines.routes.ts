import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
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

export default trainLinesRoutes;
