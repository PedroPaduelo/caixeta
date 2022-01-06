"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List_Full_raw = exports.List_Full_tabelas = exports.List_Custumer_Forme = exports.List_Full_By_User_Creating = exports.List_Full_By_Id = exports.List_Full = exports.Get_By_Id = exports.Delete = exports.UpData = exports.Insert = void 0;
const connection_1 = __importDefault(require("../Database/connection"));
async function Insert(table, dados) {
    try {
        const result = await (0, connection_1.default)(table).insert(dados, ['id']);
        dados["id"] = parseInt(result[0].id);
        return ({
            status: "success",
            data: dados,
            message: "Sucesso ao cadastrar"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao cadastrar"
        });
    }
}
exports.Insert = Insert;
async function UpData(table, id, dados) {
    try {
        const result = await (0, connection_1.default)(table)
            .where('id', id)
            .update(dados);
        if (result) {
            const resultGet = await Get_By_Id(table, id);
            resultGet.message = "Atualização feita com sucesso!!!";
            return (resultGet);
        }
        else {
            return ({
                status: "success",
                data: result,
                message: "Erro ao atualizar."
            });
        }
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao atualizar."
        });
    }
}
exports.UpData = UpData;
async function Delete(table, id) {
    try {
        const result = await (0, connection_1.default)(table)
            .where('id', id)
            .del();
        return ({
            status: "success",
            data: result,
            message: "Erro ao Inativar."
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao Inativar."
        });
    }
}
exports.Delete = Delete;
async function Get_By_Id(table, id) {
    try {
        const result = await (0, connection_1.default)(table).where('id', id).first();
        if (result) {
            return ({
                status: "success",
                data: result,
                message: "Informação localizada!!!"
            });
        }
        else {
            return ({
                status: "failed",
                data: {},
                message: "Informação não localizado!!!"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao localizar informação"
        });
    }
}
exports.Get_By_Id = Get_By_Id;
async function List_Full(table) {
    try {
        const result = await connection_1.default.select("*")
            .from(table)
            .orderBy('id');
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full = List_Full;
async function List_Full_By_Id(table, id, id_value) {
    try {
        const result = await connection_1.default.select("*")
            .from(table)
            .where(id, id_value)
            .orderBy(id);
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_Id = List_Full_By_Id;
async function List_Full_By_User_Creating(table, user_created) {
    try {
        const result = await connection_1.default.select("*")
            .from(table)
            .where('user_created', user_created)
            .orderBy('id');
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_By_User_Creating = List_Full_By_User_Creating;
async function List_Custumer_Forme(id) {
    try {
        const result = await connection_1.default.transaction(async (trx) => {
            let forme = {
                fomedados: {},
                questions: []
            };
            const fomedados = await trx("tbl_forme").select("*").where('id', id).first();
            const resultQuestions = await trx("tbl_question").select("*").where('id_forme', id);
            const questions = await Promise.all(resultQuestions.map(async (question) => {
                const resultOptions = await (0, connection_1.default)('tbl_options_select_question')
                    .where('id_question', question.id);
                question["options"] = resultOptions;
                return question;
            }));
            forme.fomedados = fomedados;
            forme.questions = questions;
            return forme;
        });
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Custumer_Forme = List_Custumer_Forme;
async function List_Full_tabelas() {
    try {
        const result = await connection_1.default.raw("select * from information_schema.tables");
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_tabelas = List_Full_tabelas;
async function List_Full_raw(table) {
    try {
        const result = await connection_1.default.raw(`select * from ${table}`);
        return ({
            status: "success",
            data: result,
            message: "Sucesso ao listar!!!"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "success",
            data: error,
            message: "Erro ao listar."
        });
    }
}
exports.List_Full_raw = List_Full_raw;
