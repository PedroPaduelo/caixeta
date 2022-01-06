"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_data_dynamic = exports.CONTEXT_INICIAL = exports.CONTEXT_API_WKF = exports.CONTEXT_VAR_FUNCTIONS = exports.FIELD_API = void 0;
function FIELD_API(wkf_actions, id) {
    let field_api = [];
    wkf_actions.map(item => {
        field_api.push({
            id_wkf: id,
            stack: item.inputs_data_api_name,
            stackroot: "data_from_api_wkf",
            stackfull: "data_from_api_wkf." + item.inputs_data_api_name,
            type: typeof item.inputs_data_api_type
        });
    });
    return field_api;
}
exports.FIELD_API = FIELD_API;
function CONTEXT_VAR_FUNCTIONS(fns) {
    let fn_variables = new Object();
    fns.map(item => {
        fn_variables[item.fn_name] = {};
        item.fn_variable.map(item2 => {
            fn_variables[item.fn_name][item2.var_name] = item2.var_value.value;
        });
    });
    return fn_variables;
}
exports.CONTEXT_VAR_FUNCTIONS = CONTEXT_VAR_FUNCTIONS;
function CONTEXT_API_WKF(wkf_actions) {
    let obj_fields_api = new Object();
    wkf_actions.map(item => {
        obj_fields_api[item.key] = item.value;
    });
    return obj_fields_api;
}
exports.CONTEXT_API_WKF = CONTEXT_API_WKF;
function CONTEXT_INICIAL(api_wkf, var_functions) {
    const obj_fields_api = CONTEXT_API_WKF(api_wkf);
    const data_from_api_wkf = obj_fields_api;
    const obj_fields_input = CONTEXT_VAR_FUNCTIONS(var_functions);
    const data_from_var_functions = obj_fields_input;
    return {
        data_from_api_wkf,
        data_from_var_functions
    };
}
exports.CONTEXT_INICIAL = CONTEXT_INICIAL;
function resolver_object(obj, path) {
    return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, obj);
}
function get_data_dynamic(dados, conxtext) {
    let data_object = {};
    dados.map(item => {
        if (item.type_data === 'Dinamico') {
            const { key, origem } = item;
            const value_result = resolver_object(conxtext, origem + "." + item.var);
            data_object[key] = value_result;
        }
        else {
            const { key } = item;
            data_object[key] = item.var;
        }
    });
    return data_object;
}
exports.get_data_dynamic = get_data_dynamic;
