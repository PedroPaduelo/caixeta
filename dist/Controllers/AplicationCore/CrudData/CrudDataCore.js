"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCrud = exports.ListByIdCrud = exports.UpdateCrud = exports.CreatCrud = void 0;
const FunctionsBD_1 = require("../Utils/FunctionsBD");
async function CreatCrud(request, response) {
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.Insert)(table, Object.assign({}, request.body));
    return response.json(result);
}
exports.CreatCrud = CreatCrud;
async function UpdateCrud(request, response) {
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.UpData)(table, request.body.id, Object.assign({}, request.body));
    return response.json(result);
}
exports.UpdateCrud = UpdateCrud;
async function ListByIdCrud(request, response) {
    const table = request.params.table;
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.Get_By_Id)(table, id);
    return response.json(result);
}
exports.ListByIdCrud = ListByIdCrud;
async function ListCrud(request, response) {
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.List_Full_raw)(table);
    return response.json(result);
}
exports.ListCrud = ListCrud;
