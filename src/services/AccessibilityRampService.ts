import { getRepository } from 'typeorm';
import AccessibilityRamp from '../models/AccessibilityRamp';

interface POSTRequest {
  map_id: string;
  inclination: string;
  haveVisualNotification: boolean;
  lat: number;
  lng: number;
}

interface GETRequest {
  map_id: string;
}

class CreateAccessibilityRamp {
  public async create({
    map_id,
    inclination,
    haveVisualNotification,
    lat,
    lng,
  }: POSTRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'INSERT INTO accessibility_ramps (map_id, inclination, have_vision_notification, geom)' +
        'VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))',
      [map_id, inclination, haveVisualNotification, lng, lat],
    );

    return accesibilityRamp;
  }

  public async getByMap({ map_id }: GETRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'SELECT id, map_id, inclination, have_vision_notification, ST_X(geom::geometry), ST_Y(geom::geometry) FROM accessibility_ramps WHERE map_id = $1',
      [map_id],
    );

    const accesibilityRampFormatted = accesibilityRamp.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return accesibilityRampFormatted;
  }
}

export default CreateAccessibilityRamp;
