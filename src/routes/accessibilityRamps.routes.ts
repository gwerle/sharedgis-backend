import { Router } from 'express';
import AccessibilityRampService from '../services/AccessibilityRampService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accessibilityRampsRoutes = Router();

accessibilityRampsRoutes.use(ensureAuthenticated);

accessibilityRampsRoutes.post('/', async (request, response) => {
  const {
    map_id,
    inclination,
    haveVisionNotification,
    lat,
    long,
  } = request.body;
  const accessibilityRampService = new AccessibilityRampService();

  const accessibilityRamp = await accessibilityRampService.create({
    map_id,
    inclination,
    haveVisionNotification,
    lat,
    long,
  });

  return response.json(accessibilityRamp);
});

accessibilityRampsRoutes.get('/', async (request, response) => {
  const { map_id } = request.body;

  const accessibilityRampService = new AccessibilityRampService();

  const accessibilityRamp = await accessibilityRampService.getByMap({
    map_id,
  });

  return response.json(accessibilityRamp);
});

export default accessibilityRampsRoutes;
