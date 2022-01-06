"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_constraint = exports.list_fields = exports.list_tables = exports.list_schema = exports.drop_column_table = exports.rename_column_table = exports.add_column_table = exports.rename_table = exports.drop_table = exports.created_table = void 0;
const connectionDBA_1 = __importDefault(require("../Database/connectionDBA"));
async function created_table(table_name) {
    try {
        const result = await connectionDBA_1.default.schema.createTable(table_name, function (table) {
            table.increments();
            table.string('user_created');
            table.timestamp('created_at');
            table.string('user_updated');
            table.timestamp('updated_at');
        });
        return ({
            status: "success",
            data: result,
            message: "Criado com sucesso"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Erro ao cadastrar"
        });
    }
}
exports.created_table = created_table;
async function drop_table(table_name) {
    try {
        const result = await connectionDBA_1.default.schema.dropTable(table_name);
        return ({
            status: "success",
            data: result,
            message: "Tabela deletada com sucesso"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Tabela não deletada"
        });
    }
}
exports.drop_table = drop_table;
async function rename_table(oldTableName, newTableName) {
    try {
        const result = await connectionDBA_1.default.schema.renameTable(oldTableName, newTableName);
        return ({
            status: "success",
            data: result,
            message: "Tabela renomeada"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Tabela não renomeada"
        });
    }
}
exports.rename_table = rename_table;
async function add_column_table(tableName, columnName, columnType, columnLength, column_default, column_not_null) {
    if (column_default == "") {
        column_default = null;
    }
    if (columnLength == null) {
        columnLength = 255;
    }
    try {
        const result = await connectionDBA_1.default.schema.table(tableName, function (table) {
            var _a, _b;
            if (column_not_null !== "Sim") {
                (_a = table[columnType](columnName, columnLength).notNullable()) === null || _a === void 0 ? void 0 : _a.defaultTo(column_default);
            }
            else {
                (_b = table[columnType](columnName, columnLength)) === null || _b === void 0 ? void 0 : _b.defaultTo(column_default);
            }
        });
        return ({
            status: "success",
            data: result,
            message: "Tabela alterada"
        });
    }
    catch (error) {
        return ({
            status: "failed",
            data: error,
            message: "Tabela não alterada"
        });
    }
}
exports.add_column_table = add_column_table;
async function rename_column_table(tableName, columnName, newcolumnName, columnType, columnLength, column_default, column_not_null) {
    if (column_default == "") {
        column_default = null;
    }
    if (columnLength == null) {
        columnLength = 255;
    }
    try {
        const result = await connectionDBA_1.default.schema.table(tableName, function (table) {
            if (columnName !== newcolumnName && newcolumnName !== "") {
                table.renameColumn(columnName, newcolumnName);
            }
            if (column_not_null === "Sim") {
                table.setNullable(columnName);
            }
            if (column_not_null === "Não") {
                table.dropNullable(columnName);
            }
        });
        return ({
            status: "success",
            data: result,
            message: "Tabela renomeada"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Tabela não renomeada"
        });
    }
}
exports.rename_column_table = rename_column_table;
async function drop_column_table(tableName, columnName) {
    try {
        const result = await connectionDBA_1.default.schema.table(tableName, function (table) {
            table.dropColumn(columnName);
        });
        return ({
            status: "success",
            data: result,
            message: "Coluna deletada"
        });
    }
    catch (error) {
        console.log(error);
        return ({
            status: "failed",
            data: error,
            message: "Coluna não deletada"
        });
    }
}
exports.drop_column_table = drop_column_table;
async function list_schema() {
    try {
        const result = await connectionDBA_1.default.raw("select * from information_schema.schemata where schema_name <> 'information_schema' and schema_name <> 'pg_catalog' and schema_name <> 'pg_toast_temp_1' and schema_name <> 'pg_temp_1' and schema_name <> 'pg_toast'");
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
exports.list_schema = list_schema;
async function list_tables() {
    try {
        const result = await connectionDBA_1.default.raw("select table_catalog, table_schema, table_name, table_type      " +
            "from information_schema.tables where table_schema <> 'pg_catalog' and table_schema <> 'information_schema' order by table_name");
        return ({
            status: "success",
            data: result.rows,
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
exports.list_tables = list_tables;
async function list_fields(table_name) {
    try {
        const result = await connectionDBA_1.default.raw(`  select 
            table_catalog,
            table_schema,
            table_name,
            column_name,
            ordinal_position,
            column_default,
            is_nullable,
            data_type,
            character_maximum_length
          from information_schema.columns 
          where table_schema <> 'information_schema' and 
                table_schema <> 'pg_catalog' and 
                table_schema <> 'pg_toast_temp_1' and 
                table_schema <> 'pg_temp_1' and 
                table_schema <> 'pg_toast' and
                table_name = '${table_name}'`);
        return ({
            status: "success",
            data: result.rows,
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
exports.list_fields = list_fields;
async function list_constraint() {
    try {
        const result = await connectionDBA_1.default.raw("select * from information_schema.constraint_table_usage");
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
exports.list_constraint = list_constraint;
