"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refresh = exports.Login = exports.Update = exports.List = exports.Creat = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const functiosUser_1 = require("./Utils/functiosUser");
const user_fisrt_access = 1;
const user_created_at = new Date();
const user_updated_at = new Date();
async function Creat(request, response) {
    const user_email = request.body.user_email.toLowerCase();
    const user_password = await (0, bcrypt_1.hash)(request.body.user_password, 10);
    const user_fist_name = request.body.user_fist_name;
    const user_last_name = request.body.user_last_name;
    const user_photo_file = request.body.user_photo_file;
    const user_tipo = request.body.user_tipo;
    const user = await (0, functiosUser_1.Get_User_By_Email_Valid)(user_email);
    if (user.status === "failed") {
        const userCadResult = await (0, functiosUser_1.Set_User)({
            user_email,
            user_password,
            user_fist_name,
            user_last_name,
            user_photo_file,
            user_tipo,
            user_fisrt_access,
            user_created_at,
            user_updated_at
        });
        if (userCadResult.status === "success") {
            const userCad = await (0, functiosUser_1.Get_User_By_Email)(user_email);
            userCad.message = "Usuário cadastrado com sucesso!!!";
            return response.json(userCad);
        }
        else {
            return response.json(userCadResult);
        }
    }
    return response.json(user);
}
exports.Creat = Creat;
async function List(request, response) {
    const user = await (0, functiosUser_1.Get_List_Users)();
    return response.json(user);
}
exports.List = List;
async function Update(request, response) {
    const user_email = request.body.user_email.toLowerCase();
    const user_password = await (0, bcrypt_1.hash)(request.body.user_password, 10);
    const user_fist_name = request.body.user_fist_name;
    const user_last_name = request.body.user_last_name;
    const user_photo_file = request.body.user_photo_file;
    const user_tipo = request.body.user_tipo;
    const user = await (0, functiosUser_1.Get_User_By_Email_Valid)(user_email);
    if (user.status === "success") {
        return response.json(user);
    }
    else {
        const userUpData = await (0, functiosUser_1.Set_UpData_User)(user_email, {
            user_email,
            user_password,
            user_fist_name,
            user_last_name,
            user_photo_file,
            user_tipo,
            user_fisrt_access,
            user_updated_at
        });
        return response.json(userUpData);
    }
}
exports.Update = Update;
async function Login(request, response) {
    const user_password = request.body.user_password;
    const user_email = request.body.user_email;
    const user = await (0, functiosUser_1.Get_User_By_Email_With_Password)(user_email);
    if (user.status === "failed") {
        return response.json(user);
    }
    if (!await (0, bcrypt_1.compare)(user_password, user.data.user_password)) {
        return response.json({
            status: "failed",
            data: {},
            message: "Erro ao logar usuário, procure o administrador do sistema!!!"
        });
    }
    else {
        const user_token = (0, jsonwebtoken_1.sign)({ user_email: user.data.user_email }, "asdasd", {
            expiresIn: 8640000000,
        });
        if (!user_token) {
            return response.json(false);
        }
        const acessos = await (0, functiosUser_1.Get_List_Acessos_By_Users)(user.data.user_tipo);
        user.data.acessos = acessos.data;
        user.data.user_token = user_token;
        if (user.data.user_fisrt_access === 1) {
            user.message = `Olá ${user.data.user_fist_name} seja bem vindo!`;
        }
        else {
            user.message = `Olá ${user.data.user_fist_name} seja bem vindo de volta!`;
        }
        return response.json(user);
    }
}
exports.Login = Login;
async function Refresh(request, response) {
    const user = await (0, functiosUser_1.Get_User_By_Email_With_Password)(request.user_email);
    if (user) {
        const acessos = await (0, functiosUser_1.Get_List_Acessos_By_Users)(user.data.user_tipo);
        user.data.acessos = acessos.data;
        delete user.data.password;
        return response.json(user);
    }
    return response.json(false);
}
exports.Refresh = Refresh;
