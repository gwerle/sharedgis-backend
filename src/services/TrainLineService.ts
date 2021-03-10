import { getRepository } from 'typeorm';
import TrainLine from '../models/TrainLine';

interface POSTRequest {
  map_id: string;
  notes: string;
  linestring: any;
}

interface GETRequest {
  map_id: string;
}

class TrainLineService {
  public async create({
    map_id,
    notes,
    linestring,
  }: POSTRequest): Promise<any> {
    const trainLineRepository = getRepository(TrainLine);

    const linestringFormatted = linestring
      .map((line: any) => {
        return `${line[1]} ${line[0]}`;
      })
      .toString();

    const query = `LINESTRING(${linestringFormatted})`;

    const trainLines = await trainLineRepository.query(
      'INSERT INTO train_lines (map_id, notes, geom)' +
        `VALUES ($1, $2, ST_GeomFromText($3))`,
      [map_id, notes, query],
    );

    return trainLines;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<any> {
    const trainLineRepository = getRepository(TrainLine);

    const trainLines = await trainLineRepository.query(
      'SELECT map_id, notes, ST_AsText(geom) FROM train_lines WHERE map_id = $1',
      [map_id],
    );

    const trainLinesWithGeom = Promise.all(
      await trainLines.map(async (train: any) => {
        const geometryAsArray = await trainLineRepository.query(
          `SELECT ST_Y(d.geom), ST_X(d.geom)
        FROM ST_DumpPoints('${train.st_astext}') AS d`,
        );

        const geometryFormatted = geometryAsArray.map((geom: any) => {
          return Object.keys(geom).map(k => geom[k]);
        });
        return {
          ...train,
          geom: geometryFormatted,
        };
      }),
    );

    return trainLinesWithGeom;
  }
}

export default TrainLineService;
