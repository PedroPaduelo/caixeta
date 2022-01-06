import express from 'express';
import validate from '../Middleware/auth';

import { Creat, List, Login, Refresh, Update } from '../Controllers/AplicationCore/User/UserCore';
import { CreatAcessos, ListByIdAcessos, ListAcessos, UpdateAcessos } from '../Controllers/AplicationCore/Acessos/AcessosCore';

const routes = express.Router();

// User
routes.post('/User', Creat);
routes.get('/User', List);
routes.put('/User', Update);
routes.post('/User_Login', Login);

routes.use(validate);

routes.get('/User_Refresh', Refresh );

// Acessos
routes.post('/CreatAcessos', CreatAcessos );
routes.get('/ListAcessos', ListAcessos );
routes.get('/ListByIdAcessos/:id',ListByIdAcessos);
routes.put('/UpdateAcessos', UpdateAcessos );






// Rotas Bases 



export default routes;
