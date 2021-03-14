import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';
import SidewalkService from '../services/SidewalkService';

const sidewalksRoutes = Router();

sidewalksRoutes.use(ensureAuthenticated);

sidewalksRoutes.post('/', async (request, response) => {
  const {
    map_id,
    surface,
    surfaceSituation,
    width,
    haveTacticlePaving,
    haveContrastedTacticlePaving,
    tacticlePavingColor,
    tacticlePavingSituation,
    notes,
    linestring,
  } = request.body;

  const sidewalkService = new SidewalkService();

  const sidewalk = await sidewalkService.create({
    map_id,
    surface,
    surfaceSituation,
    width,
    haveTacticlePaving,
    haveContrastedTacticlePaving,
    tacticlePavingColor,
    tacticlePavingSituation,
    notes,
    linestring,
  });

  return response.json(sidewalk);
});

sidewalksRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const sidewalkService = new SidewalkService();

  const sidewalks = await sidewalkService.getByMapId({ map_id });

  return response.json(sidewalks);
});

sidewalksRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'sidewalks';

  const item = await removePointsService.execute(id, layer);

  return response.json(item);
});

export default sidewalksRoutes;
