import express from 'express';
import { ListFullCorrecao } from '../Controllers/AplicationWKF/CrudData/CrudDataCore';
import { AtualizaVendasEmLot, Indice_Prods } from '../Controllers/AplicationWKF/WorkFlowCore';


const routes = express.Router();

routes.put('/AtualizaVendasEmLot', AtualizaVendasEmLot );
routes.get('/ListFullCorrecao', ListFullCorrecao );



routes.get('/Indice_Prods', Indice_Prods );


export default routes;

