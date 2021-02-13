import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import mapsRoutes from './maps.routes';
import roadsRoutes from './roads.routes';
import accessibilityRampsRoutes from './accessibilityRamps.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/maps', mapsRoutes);
routes.use('/roads', roadsRoutes);
routes.use('/accessibility-ramps', accessibilityRampsRoutes);

export default routes;
