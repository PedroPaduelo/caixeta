import express, { json } from 'express';
import cors from 'cors';

import Routes_Core_Sistem from './routes/Routes_Aplication_Core';
import Routes_WKF from './routes/Routes_Aplication_WKF';
import Routes_Crud from './routes/Routes_Aplication_Crud';


const app = express();

app.use(cors());
app.use(json());

app.use(Routes_Core_Sistem);
app.use(Routes_WKF);
app.use(Routes_Crud);


const port = process.env.PORT || 3011;
app.listen(port);