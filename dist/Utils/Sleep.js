"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(ms) {
    new Promise((res) => setTimeout(res, ms));
}
exports.default = timeout;
