import express from 'express';
import { Creat, DeletByCol, ListByCol, ListByColLike, ListById, ListFull, SunByCol, SunByCols, SunFull, Update } from '../Controllers/AplicationWKF/CrudData/CrudDataCore';

const routes = express.Router();

routes.post('/Creat/:table', Creat );
routes.put('/Update/:table', Update );
routes.get('/ListById/:table/:id',ListById );
routes.get('/ListFull/:table', ListFull );
routes.get('/ListByCol/:table/:col/:id', ListByCol );
routes.get('/ListByColLike/:table/:col/:id', ListByColLike );
routes.delete('/DeletByCol/:table/:id', DeletByCol );


routes.get('/SunByCol/:table/:colSum/:colWhere/:col_value', SunByCol );
routes.get('/SunFull/:table/:colSum', SunFull );


routes.get('/SunByCols/:table/:colSum/:colWhere1/:col_value1/:colWhere2/:col_value2', SunByCols );

export default routes;