import { Router } from 'express';
import AccessibilityRampService from '../services/AccessibilityRampService';

const accessibilityRampsRoutes = Router();

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

export default accessibilityRampsRoutes;
