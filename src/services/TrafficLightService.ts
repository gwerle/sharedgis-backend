import { getRepository } from 'typeorm';
import TrafficLight from '../models/TrafficLight';

interface POSTRequest {
  map_id: string;
  haveSoundNotification: boolean;
  haveCrosswalk: boolean;
  lat: number;
  lng: number;
  notes: string;
}

interface GETRequest {
  map_id: string;
}

class TrafficLightService {
  public async create({
    map_id,
    haveSoundNotification,
    haveCrosswalk,
    lat,
    lng,
    notes,
  }: POSTRequest): Promise<TrafficLight> {
    const trafficLightRepository = getRepository(TrafficLight);

    const trafficLight = await trafficLightRepository.query(
      'INSERT INTO traffic_lights (map_id, have_sound_notification, have_crosswalk, notes, geom)' +
        'VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326))',
      [map_id, haveSoundNotification, haveCrosswalk, notes, lng, lat],
    );

    return trafficLight;
  }

  public async getByMapId({ map_id }: GETRequest): Promise<TrafficLight> {
    const trafficLightRepository = getRepository(TrafficLight);

    const trafficLight = await trafficLightRepository.query(
      'SELECT id, map_id, have_sound_notification, have_crosswalk, notes, ST_X(geom::geometry), ST_Y(geom::geometry) FROM traffic_lights WHERE map_id = $1',
      [map_id],
    );

    const trafficLightFormatted = trafficLight.map((item: any) => {
      return {
        ...item,
        lng: item.st_x,
        lat: item.st_y,
      };
    });

    return trafficLightFormatted;
  }
}

export default TrafficLightService;
