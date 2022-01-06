"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_List_Acessos_By_Users = exports.Get_List_Users = exports.Set_UpData_User = exports.Set_User = exports.Get_User_By_Email_Valid = exports.Get_User_By_Email_With_Password = exports.Get_User_By_Email = void 0;
const connection_1 = __importDefault(require("../../../../Database/connection"));
async function Get_User_By_Email(user_email) {
    try {
        const result = await (0, connection_1.default)('tbl_user').where('user_email', user_email).first();
        delete result.password;
        delete result.token;
        if (result) {
            return ({
                status: "success",
                data: result,
                message: "Usuário localizado!!!"
            });
        }
        else {
            return ({
                status: "failed",
                data: {},
                message: "Usuário não localizado!!!"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao localizar usuário!!!"
        });
    }
}
exports.Get_User_By_Email = Get_User_By_Email;
async function Get_User_By_Email_With_Password(user_email) {
    try {
        const result = await (0, connection_1.default)('tbl_user').where('user_email', user_email).first();
        delete result.token;
        if (result) {
            return ({
                status: "success",
                data: result,
                message: "Usuário localizado!!!"
            });
        }
        else {
            return ({
                status: "failed",
                data: {},
                message: "Usuário não localizado!!!"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao localizar usuário!!!"
        });
    }
}
exports.Get_User_By_Email_With_Password = Get_User_By_Email_With_Password;
async function Get_User_By_Email_Valid(email) {
    try {
        const result = await (0, connection_1.default)('tbl_user').where('email', email).first();
        delete result.password;
        delete result.token;
        if (result) {
            return ({
                status: "failed",
                data: result,
                message: "Usuário já cadastrado!!!"
            });
        }
        else {
            return ({
                status: "success",
                data: {},
                message: "Cadastre o usuário"
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao Validar usuário!!!"
        });
    }
}
exports.Get_User_By_Email_Valid = Get_User_By_Email_Valid;
async function Set_User(dados) {
    try {
        const result = await (0, connection_1.default)('tbl_user').insert(dados);
        return ({
            status: "success",
            data: result,
            message: "Inserte feito com sucesso!!!"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao inserir usuário."
        });
    }
}
exports.Set_User = Set_User;
async function Set_UpData_User(email, dados) {
    try {
        const result = await (0, connection_1.default)('tbl_user')
            .where('user_email', email)
            .update(dados);
        if (result) {
            const resultGet = await Get_User_By_Email(email);
            resultGet.message = "Atualização feita com sucesso!!!";
            return (resultGet);
        }
        else {
            return ({
                status: "failed",
                data: result,
                message: "Erro ao atualização usuário."
            });
        }
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao atualização usuário."
        });
    }
}
exports.Set_UpData_User = Set_UpData_User;
async function Get_List_Users() {
    try {
        const result = await connection_1.default.select('user_email', 'user_fist_name', 'user_last_name', 'user_fisrt_access', 'user_tipo', 'user_photo_file', 'user_created_at', 'user_updated_at').from('tbl_user');
        return ({
            status: "success",
            data: result,
            message: "Busca de lista de usuário feita com sucesso!!!"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao Busca de lista de usuário."
        });
    }
}
exports.Get_List_Users = Get_List_Users;
async function Get_List_Acessos_By_Users(id_tipo_user) {
    try {
        const result = await connection_1.default.select('tbl_foundation_acessos.*')
            .from('tbl_foundation_acessos')
            .where('id_tipo_user', id_tipo_user);
        return ({
            status: "success",
            data: result,
            message: "Busca das filas atreladas ao user feita com sucesso!!!"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao Busca das filas atreladas ao user."
        });
    }
}
exports.Get_List_Acessos_By_Users = Get_List_Acessos_By_Users;
