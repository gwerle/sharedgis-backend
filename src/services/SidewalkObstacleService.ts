import { getRepository } from 'typeorm';
import SidewalkObstacle from '../models/SidewalkObstacle';

interface POSTRequest {
  map_id: string;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class SidewalkObstacleService {
  public async create({
    map_id,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<SidewalkObstacle> {
    const sidewalkObstacleService = getRepository(SidewalkObstacle);

    const sidewalkObstacle = await sidewalkObstacleService.query(
      'INSERT INTO sidewalk_obstacles (map_id, notes, geom)' +
        'VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))',
      [map_id, notes, lng, lat],
    );

    return sidewalkObstacle;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<SidewalkObstacle> {
    const sidewalkObstacleService = getRepository(SidewalkObstacle);

    const sidewalkObstacle = await sidewalkObstacleService.query(
      'SELECT id, map_id, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM sidewalk_obstacles WHERE map_id = $1',
      [map_id],
    );

    const sidewalkObstacleFormatted = sidewalkObstacle.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return sidewalkObstacleFormatted;
  }
}

export default SidewalkObstacleService;
