"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CrudDataCore_1 = require("../Controllers/AplicationWKF/CrudData/CrudDataCore");
const routes = express_1.default.Router();
routes.post('/Creat/:table', CrudDataCore_1.Creat);
routes.put('/Update/:table', CrudDataCore_1.Update);
routes.get('/ListById/:table/:id', CrudDataCore_1.ListById);
routes.get('/ListFull/:table', CrudDataCore_1.ListFull);
routes.get('/ListByCol/:table/:col/:id', CrudDataCore_1.ListByCol);
routes.get('/ListByColLike/:table/:col/:id', CrudDataCore_1.ListByColLike);
routes.delete('/DeletByCol/:table/:id', CrudDataCore_1.DeletByCol);
exports.default = routes;
