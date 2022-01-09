import express from 'express';
import { AtualizaVendasEmLot } from '../Controllers/AplicationWKF/WorkFlowCore';


const routes = express.Router();


routes.put('/AtualizaVendasEmLot', AtualizaVendasEmLot );



export default routes;

