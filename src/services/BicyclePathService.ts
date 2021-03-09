import { getRepository } from 'typeorm';
import BicyclePath from '../models/BicyclePath';

interface POSTRequest {
  map_id: string;
  surfaceSituation: string;
  bicyclePathType: string;
  notes: boolean;
  linestring: any;
}

interface GETRequest {
  map_id: string;
}

class BicyclePathService {
  public async create({
    map_id,
    surfaceSituation,
    bicyclePathType,
    notes,
    linestring,
  }: POSTRequest): Promise<any> {
    const bicyclePathRepository = getRepository(BicyclePath);

    const linestringFormatted = linestring
      .map((line: any) => {
        return `${line[1]} ${line[0]}`;
      })
      .toString();

    const query = `LINESTRING(${linestringFormatted})`;

    const bicyclePath = await bicyclePathRepository.query(
      'INSERT INTO bicycle_paths (map_id, surface_situation, bicycle_path_type, notes, geom)' +
        `VALUES ($1, $2, $3, $4, ST_GeomFromText($5))`,
      [map_id, surfaceSituation, bicyclePathType, notes, query],
    );

    return bicyclePath;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<any> {
    const bicyclePathRepository = getRepository(BicyclePath);

    const bicyclePaths = await bicyclePathRepository.query(
      'SELECT map_id, surface_situation, bicycle_path_type, notes, ST_AsText(geom) FROM bicycle_paths WHERE map_id = $1',
      [map_id],
    );

    const bicyclePathsWithGeom = Promise.all(
      await bicyclePaths.map(async (bicyclePath: any) => {
        const geometryAsArray = await bicyclePathRepository.query(
          `SELECT ST_Y(d.geom), ST_X(d.geom)
        FROM ST_DumpPoints('${bicyclePath.st_astext}') AS d`,
        );

        const geometryFormatted = geometryAsArray.map((geom: any) => {
          return Object.keys(geom).map(k => geom[k]);
        });
        return {
          ...bicyclePath,
          geom: geometryFormatted,
        };
      }),
    );

    return bicyclePathsWithGeom;
  }
}

export default BicyclePathService;
