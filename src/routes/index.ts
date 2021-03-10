import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import mapsRoutes from './maps.routes';
import roadsRoutes from './roads.routes';
import accessibilityRampsRoutes from './accessibilityRamps.routes';
import bicyclePathRoutes from './bicyclePath.routes';
import bikeParksRoutes from './bikeParks.routes';
import bikeSupportPointsRoutes from './bikeSupportPoints.routes';
import busStopsRoutes from './busStops.routes';
import sidewalkObstaclesRoutes from './sidewalkObstacles.routes';
import sidewalksRoutes from './sidewalks.routes';
import taxiStopsRoutes from './taxiStops.routes';
import trafficLightsRoutes from './trafficLights.routes';
import trainCrossRoutes from './trainCross.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/maps', mapsRoutes);
routes.use('/roads', roadsRoutes);
routes.use('/accessibility-ramps', accessibilityRampsRoutes);
routes.use('/bicycle-paths', bicyclePathRoutes);
routes.use('/bike-parks', bikeParksRoutes);
routes.use('/bike-support-points', bikeSupportPointsRoutes);
routes.use('/bus-stops', busStopsRoutes);
routes.use('/sidewalk-obstacles', sidewalkObstaclesRoutes);
routes.use('/sidewalks', sidewalksRoutes);
routes.use('/taxi-stops', taxiStopsRoutes);
routes.use('/traffic-lights', trafficLightsRoutes);
routes.use('/train-cross', trainCrossRoutes);

export default routes;
