"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const connection = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: 'castor.db.elephantsql.com',
        database: 'dhnncpcp',
        user: 'dhnncpcp',
        password: 'K1d7TXEm_4O6uoMUDSZJXo5T0_Nz0K1v'
    },
    useNullAsDefault: true
});
exports.default = connection;
