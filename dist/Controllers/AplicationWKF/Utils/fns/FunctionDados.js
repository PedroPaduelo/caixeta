"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dado_Get = exports.Dados_List = exports.Dados_UpData = exports.Dados_Insert = void 0;
const FunctionsContext_1 = require("../FunctionsContext");
const FunctionsBD_1 = require("./BD/FunctionsBD");
const created_at = new Date();
const updated_at = new Date();
async function Dados_Insert(argumentos, context) {
    const user_created = argumentos.user_email;
    const user_updated = argumentos.user_email;
    const data = (0, FunctionsContext_1.get_data_dynamic)(argumentos.dados, context);
    try {
        const result = await (0, FunctionsBD_1.Insert)(argumentos.table, Object.assign(Object.assign({}, data), { created_at,
            updated_at,
            user_created,
            user_updated }));
        return ({
            status: "success",
            data: result.result,
            message: "Sucesso ao executar Dados_Insert"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar Dados_Insert"
        });
    }
}
exports.Dados_Insert = Dados_Insert;
async function Dados_UpData(argumentos, context) {
    const user_updated = argumentos.user_email;
    const data = (0, FunctionsContext_1.get_data_dynamic)(argumentos.dados, context);
    try {
        const result = await (0, FunctionsBD_1.UpData)(argumentos.table, data["id"], Object.assign(Object.assign({}, data), { updated_at,
            user_updated }));
        return ({
            status: "success",
            data: result.result,
            message: "Sucesso ao executar Dados_UpData"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar Dados_UpData"
        });
    }
}
exports.Dados_UpData = Dados_UpData;
async function Dados_List(argumentos, context) {
    try {
        const result = await (0, FunctionsBD_1.List_Full)(argumentos.table);
        return ({
            status: "success",
            data: result.result,
            message: "Sucesso ao executar Dados_List"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar Dados_List"
        });
    }
}
exports.Dados_List = Dados_List;
async function Dado_Get(argumentos, context) {
    const data = (0, FunctionsContext_1.get_data_dynamic)(argumentos.dados, context);
    try {
        const result = await (0, FunctionsBD_1.List_Full_By_Col)(argumentos.table, data["col"], data["col_value"]);
        return ({
            status: "success",
            data: result.result,
            message: "Sucesso ao executar Dados_List"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar Dados_List"
        });
    }
}
exports.Dado_Get = Dado_Get;
