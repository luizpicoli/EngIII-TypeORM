import { Router } from 'express';
import productRouter from './product.routes';
import clientRouter from './client.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/clients', clientRouter);

export default routes;
