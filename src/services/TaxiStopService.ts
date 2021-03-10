import { getRepository } from 'typeorm';
import TaxiStop from '../models/TaxiStop';

interface POSTRequest {
  map_id: string;
  haveSeats: boolean;
  haveVisualNotification: boolean;
  haveSoundNotification: boolean;
  accessibleToWheelchair: boolean;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class TaxiStopService {
  public async create({
    map_id,
    haveSeats,
    haveVisualNotification,
    haveSoundNotification,
    accessibleToWheelchair,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<TaxiStop> {
    const taxiStopRepository = getRepository(TaxiStop);

    const taxiStop = await taxiStopRepository.query(
      'INSERT INTO taxi_stops (map_id, have_seats, have_visual_notification, have_sound_notification, accessible_to_wheelchair, notes, geom)' +
        'VALUES ($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326))',
      [
        map_id,
        haveSeats,
        haveVisualNotification,
        haveSoundNotification,
        accessibleToWheelchair,
        notes,
        lng,
        lat,
      ],
    );

    return taxiStop;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<TaxiStop> {
    const taxiStopRepository = getRepository(TaxiStop);

    const taxiStop = await taxiStopRepository.query(
      'SELECT id, map_id, have_seats, have_visual_notification, have_sound_notification, accessible_to_wheelchair, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM taxi_stops WHERE map_id = $1',
      [map_id],
    );

    const taxiStopFormatted = taxiStop.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return taxiStopFormatted;
  }
}

export default TaxiStopService;
