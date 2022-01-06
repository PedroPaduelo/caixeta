"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByColLike = exports.DeletByCol = exports.ListByCol = exports.ListById = exports.ListFull = exports.Update = exports.Creat = void 0;
const FunctionsBD_1 = require("./FunctionsBD");
const created_at = new Date();
const updated_at = new Date();
async function Creat(request, response) {
    const user_created = request.user_email;
    const user_updated = request.user_email;
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.Insert)(table, Object.assign(Object.assign({}, request.body), { created_at,
        updated_at,
        user_created,
        user_updated }));
    return response.json(result);
}
exports.Creat = Creat;
async function Update(request, response) {
    const user_updated = request.user_email;
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.UpData)(table, request.body.id, Object.assign(Object.assign({}, request.body), { updated_at,
        user_updated }));
    return response.json(result);
}
exports.Update = Update;
async function ListFull(request, response) {
    const table = request.params.table;
    const result = await (0, FunctionsBD_1.List)(table);
    return response.json(result);
}
exports.ListFull = ListFull;
async function ListById(request, response) {
    const table = request.params.table;
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.Get_By_Id)(table, id);
    return response.json(result);
}
exports.ListById = ListById;
async function ListByCol(request, response) {
    const table = request.params.table;
    const col = request.params.col;
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.List_Full_By_Col)(table, col, id);
    return response.json(result);
}
exports.ListByCol = ListByCol;
async function DeletByCol(request, response) {
    const table = request.params.table;
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.Delete)(table, id);
    return response.json(result);
}
exports.DeletByCol = DeletByCol;
async function ListByColLike(request, response) {
    const table = request.params.table;
    const col = request.params.col;
    const id = request.params.id;
    const result = await (0, FunctionsBD_1.List_Full_By_Col_like)(table, col, id);
    return response.json(result);
}
exports.ListByColLike = ListByColLike;
