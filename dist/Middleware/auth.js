"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
async function validate(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).send({ erro: "Erro authorization" });
    }
    const partes = authorization.split(' ');
    if (partes.length !== 2) {
        return response.status(401).send({ erro: "Erro token" });
    }
    const [scheme, token] = partes;
    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({ erro: "O token esta no formato errado" });
    }
    (0, jsonwebtoken_1.verify)(token, "asdasd", function (err, decoded) {
        if (err) {
            return response.status(401).send({ erro: "O token invalido" });
        }
        request.user_email = decoded.user_email;
        return next();
    });
}
exports.default = validate;
