import { getRepository } from 'typeorm';
import AccessibilityRamp from '../models/AccessibilityRamp';

interface Request {
  map_id: string;
  inclination: string;
  haveVisionNotification: boolean;
  lat: number;
  long: number;
}

class CreateAccessibilityRamp {
  public async create({
    map_id,
    inclination,
    haveVisionNotification,
    lat,
    long,
  }: Request): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'INSERT INTO accessibility_ramps (map_id, inclination, have_vision_notification, geom)' +
        'VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))',
      [map_id, inclination, haveVisionNotification, long, lat],
    );

    return accesibilityRamp;
  }
}

export default CreateAccessibilityRamp;
