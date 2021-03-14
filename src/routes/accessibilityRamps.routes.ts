import { Router } from 'express';
import AccessibilityRampService from '../services/AccessibilityRampService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RemovePointsService from '../services/RemovePointsService';

const accessibilityRampsRoutes = Router();

accessibilityRampsRoutes.use(ensureAuthenticated);

accessibilityRampsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    inclination,
    haveVisualNotification,
    lat,
    lng,
    notes,
  } = request.body;
  const accessibilityRampService = new AccessibilityRampService();

  const accessibilityRamp = await accessibilityRampService.create({
    map_id,
    inclination,
    haveVisualNotification,
    lat,
    lng,
    notes,
  });

  return response.json(accessibilityRamp);
});

accessibilityRampsRoutes.get('/', async (request, response) => {
  const { map_id } = request.query as any;

  const accessibilityRampService = new AccessibilityRampService();

  const accessibilityRamp = await accessibilityRampService.getByMap({
    map_id,
  });

  return response.json(accessibilityRamp);
});

accessibilityRampsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params as any;
  const removePointsService = new RemovePointsService();
  const layer = 'accessibility_ramps';

  const accessibilityRamp = await removePointsService.execute(id, layer);

  return response.json(accessibilityRamp);
});

export default accessibilityRampsRoutes;
