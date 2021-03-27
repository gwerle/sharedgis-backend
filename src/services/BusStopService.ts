import { getRepository } from 'typeorm';
import BusStop from '../models/BusStop';

interface POSTRequest {
  map_id: string;
  accessibleToWheelchair: boolean;
  haveVisualNotification: boolean;
  haveSoundNotification: boolean;
  rainCovered: boolean;
  haveBusLinesDemonstrations: boolean;
  haveSeats: boolean;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class BusStopService {
  public async create({
    map_id,
    accessibleToWheelchair,
    haveVisualNotification,
    haveSoundNotification,
    rainCovered,
    haveBusLinesDemonstrations,
    haveSeats,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<BusStop> {
    const busStopRepository = getRepository(BusStop);

    const busStop = await busStopRepository.query(
      'INSERT INTO bus_stops (map_id, accessible_to_wheelchair, have_visual_notification, have_sound_notification, rain_covered, have_bus_lines_demonstrations, have_seats, notes, geom)' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ST_SetSRID(ST_MakePoint($9, $10), 4326))',
      [
        map_id,
        accessibleToWheelchair,
        haveVisualNotification,
        haveSoundNotification,
        rainCovered,
        haveBusLinesDemonstrations,
        haveSeats,
        notes,
        lng,
        lat,
      ],
    );

    return busStop;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<BusStop> {
    const busStopRepository = getRepository(BusStop);

    const busStop = await busStopRepository.query(
      'SELECT id, map_id, accessible_to_wheelchair, have_visual_notification, have_sound_notification, rain_covered, have_bus_lines_demonstrations, have_seats, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM bus_stops WHERE map_id = $1',
      [map_id],
    );

    const busStopFormatted = busStop.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return busStopFormatted;
  }
}

export default BusStopService;
