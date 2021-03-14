import { getRepository } from 'typeorm';

import AccessibilityRamp from '../models/AccessibilityRamp';
import BicyclePath from '../models/BicyclePath';
import BikeSupportPoint from '../models/BikeSupportPoint';
import BusStop from '../models/BusStop';
import Roads from '../models/Roads';
import Sidewalk from '../models/Sidewalk';
import SidewalkObstacle from '../models/SidewalkObstacle';
import TaxiStop from '../models/TaxiStop';
import TrafficLight from '../models/TrafficLight';
import TrainCross from '../models/TrainCross';
import TrainLine from '../models/TrainLine';

class RemovePointsService {
  public async execute(id: string, layer: string): Promise<void> {
    function getLayerRepository() {
      switch (layer) {
        case 'accessibility_ramps':
          return AccessibilityRamp;
        case 'bicycle_paths':
          return BicyclePath;
        case 'bike_support_points':
          return BikeSupportPoint;
        case 'bus_stops':
          return BusStop;
        case 'roads':
          return Roads;
        case 'sidewalk_obstacles':
          return SidewalkObstacle;
        case 'sidewalks':
          return Sidewalk;
        case 'taxi_stops':
          return TaxiStop;
        case 'traffic_lights':
          return TrafficLight;
        case 'train_cross':
          return TrainCross;
        case 'train-lines':
          return TrainLine;
        default:
          return AccessibilityRamp;
      }
    }
    const pointRepository = getRepository(getLayerRepository());

    const query = `DELETE FROM ${layer} WHERE id = $1`;

    const point = await pointRepository.query(query, [id]);

    return point;
  }
}

export default RemovePointsService;
