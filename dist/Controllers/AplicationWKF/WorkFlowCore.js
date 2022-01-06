"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creat = void 0;
const FunctionsBD_1 = require("./Utils/FunctionsBD");
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
