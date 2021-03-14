import { getRepository } from 'typeorm';
import AccessibilityRamp from '../models/AccessibilityRamp';

interface POSTRequest {
  map_id: string;
  inclination: string;
  haveVisualNotification: boolean;
  lat: number;
  lng: number;
  notes: string;
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
    notes,
  }: POSTRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'INSERT INTO accessibility_ramps (map_id, inclination, have_visual_notification, notes, geom)' +
        'VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326))',
      [map_id, inclination, haveVisualNotification, notes, lng, lat],
    );

    return accesibilityRamp;
  }

  public async getByMap({ map_id }: GETRequest): Promise<AccessibilityRamp> {
    const accessibilityRampRepository = getRepository(AccessibilityRamp);

    const accesibilityRamp = await accessibilityRampRepository.query(
      'SELECT id, map_id, inclination, have_visual_notification, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM accessibility_ramps WHERE map_id = $1',
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
