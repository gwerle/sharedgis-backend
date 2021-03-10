import { getRepository } from 'typeorm';
import Roads from '../models/Roads';

interface POSTRequest {
  name: string;
  map_id: string;
  way: string;
  slope: string;
  paved: boolean;
  roadCondition: string;
  havePublicTransportation: boolean;
  notes: string;
  linestring: any;
}

interface GETRequest {
  map_id: string;
}

class RoadsService {
  public async create({
    name,
    map_id,
    way,
    slope,
    paved,
    roadCondition,
    havePublicTransportation,
    notes,
    linestring,
  }: POSTRequest): Promise<any> {
    const roadsRepository = getRepository(Roads);

    const linestringFormatted = linestring
      .map((line: any) => {
        return `${line[1]} ${line[0]}`;
      })
      .toString();

    const query = `LINESTRING(${linestringFormatted})`;

    const road = await roadsRepository.query(
      'INSERT INTO roads (map_id, name, way, slope, paved, road_condition, have_bus_lines, notes, geom)' +
        `VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ST_GeomFromText($9))`,
      [
        map_id,
        name,
        way,
        slope,
        paved,
        roadCondition,
        havePublicTransportation,
        notes,
        query,
      ],
    );

    return road;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<any> {
    const roadsRepository = getRepository(Roads);

    const roads = await roadsRepository.query(
      'SELECT map_id, name, way, slope, paved, road_condition, have_bus_lines, notes, ST_AsText(geom) FROM roads WHERE map_id = $1',
      [map_id],
    );

    const roadsWithGeom = Promise.all(
      await roads.map(async (road: any) => {
        const geometryAsArray = await roadsRepository.query(
          `SELECT ST_Y(d.geom), ST_X(d.geom)
        FROM ST_DumpPoints('${road.st_astext}') AS d`,
        );

        const geometryFormatted = geometryAsArray.map((geom: any) => {
          return Object.keys(geom).map(k => geom[k]);
        });
        return {
          ...road,
          geom: geometryFormatted,
        };
      }),
    );

    return roadsWithGeom;
  }
}

export default RoadsService;
