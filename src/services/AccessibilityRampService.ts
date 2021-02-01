import { getRepository } from 'typeorm';
import AccessibilityRamp from '../models/AccessibilityRamp';

interface POSTRequest {
  map_id: string;
  inclination: string;
  haveVisionNotification: boolean;
  lat: number;
  long: number;
}

interface GETRequest {
  map_id: string;
}

class CreateAccessibilityRamp {
  public async create({
    map_id,
    inclination,
    haveVisionNotification,
    lat,
    long,
  }: POSTRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'INSERT INTO accessibility_ramps (map_id, inclination, have_vision_notification, geom)' +
        'VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))',
      [map_id, inclination, haveVisionNotification, long, lat],
    );

    return accesibilityRamp;
  }

  public async getByMap({ map_id }: GETRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'SELECT id, map_id, inclination, have_vision_notification, ST_X(geom::geometry), ST_Y(geom::geometry) FROM accessibility_ramps WHERE map_id = $1',
      [map_id],
    );

    return accesibilityRamp;
  }
}

export default CreateAccessibilityRamp;
