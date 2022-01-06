"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = __importDefault(require("url"));
function api_params_to_obj(arrayParams) {
    let paramsObj = {};
    arrayParams.map(item => {
        paramsObj[item.key] = item.value;
    });
    const returno = new url_1.default.URLSearchParams(paramsObj);
    return paramsObj;
}
function api_headers_to_obj(api_headers) {
    let headersObj = {};
    api_headers.map(item => {
        headersObj[item.key] = item.value;
    });
    return headersObj;
}
async function Api(argumentos) {
    const params = api_params_to_obj(argumentos.api_parameters);
    const headers = api_headers_to_obj(argumentos.api_headers);
    try {
        const result = await (0, axios_1.default)({
            method: argumentos.api_method,
            url: argumentos.api_path,
            params: params,
            headers: headers
        });
        return ({
            status: "success",
            data: result.data,
            message: "Sucesso ao executar API"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Erro ao executar API"
        });
    }
}
exports.Api = Api;
