import { getRepository } from 'typeorm';
import BikePark from '../models/BikePark';

interface POSTRequest {
  map_id: string;
  bikeRacksCondition: string;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class BikeParkService {
  public async create({
    map_id,
    bikeRacksCondition,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<BikePark> {
    const bikeParkRepository = getRepository(BikePark);

    const bikePark = await bikeParkRepository.query(
      'INSERT INTO accessibility_ramps (map_id, bike_racks_conditions, notes, geom)' +
        'VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))',
      [map_id, bikeRacksCondition, notes, lng, lat],
    );

    return bikePark;
  }

  public async getByMap({ map_id }: GETRequest): Promise<BikePark> {
    const bikeParkRepository = getRepository(BikePark);

    const bikePark = await bikeParkRepository.query(
      'SELECT id, map_id, inclination, ST_X(geom::geometry), ST_Y(geom::geometry) FROM accessibility_ramps WHERE map_id = $1',
      [map_id],
    );

    const bikeParkFormatted = bikePark.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return bikeParkFormatted;
  }
}

export default BikeParkService;
