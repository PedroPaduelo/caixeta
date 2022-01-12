import express from 'express';
import { ListFullCorrecao } from '../Controllers/AplicationWKF/CrudData/CrudDataCore';
import { AtualizaVendasEmLot } from '../Controllers/AplicationWKF/WorkFlowCore';


const routes = express.Router();


routes.put('/AtualizaVendasEmLot', AtualizaVendasEmLot );



routes.get('/ListFullCorrecao', ListFullCorrecao );



export default routes;

