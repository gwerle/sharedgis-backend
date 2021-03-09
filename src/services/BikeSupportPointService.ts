import { getRepository } from 'typeorm';
import BikeSupportPoint from '../models/BikeSupportPoint';

interface POSTRequest {
  map_id: string;
  havePumpTireBomb: boolean;
  haveFoodToSell: boolean;
  haveBikeSupportParts: boolean;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class BikeSupportPointService {
  public async create({
    map_id,
    havePumpTireBomb,
    haveFoodToSell,
    haveBikeSupportParts,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<BikeSupportPoint> {
    const bikeSupportPointRepository = getRepository(BikeSupportPoint);

    const bikeSupportPoint = await bikeSupportPointRepository.query(
      'INSERT INTO bike_support_points (map_id, have_pump_tire_bomb, have_food_to_sell, have_bike_support_parts, notes, geom)' +
        'VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326))',
      [
        map_id,
        havePumpTireBomb,
        haveFoodToSell,
        haveBikeSupportParts,
        notes,
        lng,
        lat,
      ],
    );

    return bikeSupportPoint;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<BikeSupportPoint> {
    const bikeSupportPointRepository = getRepository(BikeSupportPoint);

    const bikeSupportPoint = await bikeSupportPointRepository.query(
      'SELECT id, map_id, have_pump_tire_bomb, have_food_to_sell, have_bike_support_parts, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM bike_support_points WHERE map_id = $1',
      [map_id],
    );

    const bikeSupportPointFormatted = bikeSupportPoint.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return bikeSupportPointFormatted;
  }
}

export default BikeSupportPointService;
