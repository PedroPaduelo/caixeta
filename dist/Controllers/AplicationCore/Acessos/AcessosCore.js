"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAcessos = exports.ListByIdAcessos = exports.UpdateAcessos = exports.CreatAcessos = void 0;
const FunctionsBD_1 = require("../../../Utils/FunctionsBD");
const table = 'tbl_foundation_acessos';
async function CreatAcessos(request, response) {
    const acessos_path = request.body.acessos_path;
    const acessos_name = request.body.acessos_name;
    const acessos_component = request.body.acessos_component;
    const acessos_icon = request.body.acessos_icon;
    const id_tipo_user = request.body.id_tipo_user;
    const result = await (0, FunctionsBD_1.Insert)(table, {
        acessos_path,
        acessos_name,
        acessos_component,
        acessos_icon,
        id_tipo_user
    });
    return response.json(result);
}
exports.CreatAcessos = CreatAcessos;
async function UpdateAcessos(request, response) {
    const id = request.body.id;
    const acessos_path = request.body.acessos_path;
    const acessos_name = request.body.acessos_name;
    const acessos_component = request.body.acessos_component;
    const acessos_icon = request.body.acessos_icon;
    const id_tipo_user = request.body.id_tipo_user;
    const result = await (0, FunctionsBD_1.UpData)(table, id, {
        acessos_path,
        acessos_name,
        acessos_component,
        acessos_icon,
        id_tipo_user
    });
    return response.json(result);
}
exports.UpdateAcessos = UpdateAcessos;
async function ListByIdAcessos(request, response) {
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.Get_By_Id)(table, id);
    return response.json(result);
}
exports.ListByIdAcessos = ListByIdAcessos;
async function ListAcessos(request, response) {
    const result = await (0, FunctionsBD_1.List_Full)(table);
    return response.json(result);
}
exports.ListAcessos = ListAcessos;
