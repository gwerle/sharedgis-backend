import { getRepository } from 'typeorm';
import TrainCross from '../models/TrainCross';

interface POSTRequest {
  map_id: string;
  haveVisualAlert: boolean;
  haveSoundAlert: boolean;
  haveFarVisibilityOfTheTrainLine: boolean;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class TrainCrossService {
  public async create({
    map_id,
    haveVisualAlert,
    haveSoundAlert,
    haveFarVisibilityOfTheTrainLine,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<TrainCross> {
    const trainCrossService = getRepository(TrainCross);

    const trainCross = await trainCrossService.query(
      'INSERT INTO train_cross (map_id, have_visual_alert, have_sound_alert, have_far_visibility_of_the_train_line, notes, geom)' +
        'VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326))',
      [
        map_id,
        haveVisualAlert,
        haveSoundAlert,
        haveFarVisibilityOfTheTrainLine,
        notes,
        lng,
        lat,
      ],
    );

    return trainCross;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<TrainCross> {
    const trainCrossService = getRepository(TrainCross);

    const trainCross = await trainCrossService.query(
      'SELECT id, map_id, have_visual_alert, have_sound_alert, have_far_visibility_of_the_train_line, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM train_cross WHERE map_id = $1',
      [map_id],
    );

    const trainCrossFormatted = trainCross.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return trainCrossFormatted;
  }
}

export default TrainCrossService;
