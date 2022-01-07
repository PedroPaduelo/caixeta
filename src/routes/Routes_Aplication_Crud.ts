import express from 'express';
import { Creat, DeletByCol, ListByCol, ListByColLike, ListById, ListFull, SunByCol, SunFull, Update } from '../Controllers/AplicationWKF/CrudData/CrudDataCore';

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

export default routes;