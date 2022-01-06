"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List_Full_By_Col_like = exports.List_Full_raw = exports.List_Full_By_User_Creating = exports.List_Full = exports.Get_By_Id = exports.List_Full_By_Col = exports.List = exports.Delete = exports.UpData = exports.Insert = void 0;
const connection_1 = __importDefault(require("../../../Database/connection"));
async function Insert(table, dados) {
    try {
        const result = await (0, connection_1.default)(table).insert(dados, ['id']);
        dados["id"] = parseInt(result[0].id);
        return ({
            status: "success",
            result: dados,
            message: "Sucesso ao cadastrar"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            result: error,
            message: "Erro ao cadastrar"
        });
    }
}
exports.Insert = Insert;
async function UpData(table, id, dados) {
    try {
        const result = await (0, connection_1.default)(table).where('id', id).update(dados);
        if (result) {
            const resultGet = await Get_By_Id(table, id);
            resultGet.message = "Atualização feita com sucesso!!!";
            return (resultGet);
        }
        else {
            return ({
                status: "success",
                result: result,
                message: "Erro ao atualizar."
            });
        }
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            result: error,
            message: "Erro ao atualizar."
        });
    }
}
exports.UpData = UpData;
async function Delete(table, id) {
    try {
        const result = await (0, connection_1.default)(table).where('id', id).del();
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao deletar."
        });
    }
    catch (error) {
        return ({
            status: "failed",
            result: error,
            message: "Erro ao Inativar."
        });
    }
}
exports.Delete = Delete;
async function List(table) {
    try {
        const result = await connection_1.default.select("*").from(table).orderBy("id");
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar dados de " + table + "."
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar dados de " + table + "."
        });
    }
}
exports.List = List;
async function List_Full_By_Col(table, col, col_value) {
    try {
        const result = await connection_1.default.select("*")
            .from(table)
            .where(col, col_value)
            .orderBy(col);
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_Col = List_Full_By_Col;
async function Get_By_Id(table, id) {
    try {
        const result = await (0, connection_1.default)(table).where('id', id).first();
        if (result) {
            return ({
                status: "success",
                result: result,
                message: "Informação localizada!!!"
            });
        }
        else {
            return ({
                status: "failed",
                result: {},
                message: "Informação não localizado!!!"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            result: error,
            message: "Erro ao localizar informação"
        });
    }
}
exports.Get_By_Id = Get_By_Id;
async function List_Full(table) {
    try {
        const result = await connection_1.default.select("*").from(table);
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full = List_Full;
async function List_Full_By_User_Creating(table, user_created) {
    try {
        const result = await connection_1.default.select("*")
            .from(table)
            .where('user_created', user_created)
            .orderBy('id');
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_User_Creating = List_Full_By_User_Creating;
async function List_Full_raw(table) {
    try {
        const result = await connection_1.default.raw(`select * from ${table}`);
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_raw = List_Full_raw;
async function List_Full_By_Col_like(table, col, col_value) {
    try {
        const result = await (0, connection_1.default)(table).where(col, 'like', '%' + col_value + '%');
        return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_Col_like = List_Full_By_Col_like;
