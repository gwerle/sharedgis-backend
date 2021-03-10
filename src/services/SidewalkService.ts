import { getRepository } from 'typeorm';
import Sidewalk from '../models/Sidewalk';

interface POSTRequest {
  map_id: string;
  surface: string;
  surfaceSituation: string;
  width: number;
  haveTacticlePaving: boolean;
  haveContrastedTacticlePaving: boolean;
  tacticlePavingColor: string;
  tacticlePavingSituation: string;
  notes: string;
  linestring: any;
}

interface GETRequest {
  map_id: string;
}

class SidewalkService {
  public async create({
    map_id,
    surface,
    surfaceSituation,
    width,
    haveTacticlePaving,
    haveContrastedTacticlePaving,
    tacticlePavingColor,
    tacticlePavingSituation,
    notes,
    linestring,
  }: POSTRequest): Promise<any> {
    const sidewalkRepository = getRepository(Sidewalk);

    const linestringFormatted = linestring
      .map((line: any) => {
        return `${line[1]} ${line[0]}`;
      })
      .toString();

    const query = `LINESTRING(${linestringFormatted})`;

    const sidewalk = await sidewalkRepository.query(
      'INSERT INTO sidewalks (map_id, surface, surface_situation, width, have_tacticle_paving, have_contrasted_tacticle_paving, tacticle_paving_color, tacticle_paving_situation, notes, geom)' +
        `VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ST_GeomFromText($10))`,
      [
        map_id,
        surface,
        surfaceSituation,
        width,
        haveTacticlePaving,
        haveContrastedTacticlePaving,
        tacticlePavingColor,
        tacticlePavingSituation,
        notes,
        query,
      ],
    );

    return sidewalk;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<any> {
    const sidewalkRepository = getRepository(Sidewalk);

    const sidewalks = await sidewalkRepository.query(
      'SELECT map_id, surface, surface_situation, width, have_tacticle_paving, have_contrasted_tacticle_paving, tacticle_paving_color, tacticle_paving_situation, notes, ST_AsText(geom) FROM sidewalks WHERE map_id = $1',
      [map_id],
    );

    const sidewalkWithGeom = Promise.all(
      await sidewalks.map(async (sidewalk: any) => {
        const geometryAsArray = await sidewalkRepository.query(
          `SELECT ST_Y(d.geom), ST_X(d.geom)
        FROM ST_DumpPoints('${sidewalk.st_astext}') AS d`,
        );

        const geometryFormatted = geometryAsArray.map((geom: any) => {
          return Object.keys(geom).map(k => geom[k]);
        });
        return {
          ...sidewalk,
          geom: geometryFormatted,
        };
      }),
    );

    return sidewalkWithGeom;
  }
}

export default SidewalkService;
