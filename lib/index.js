"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./errors"));
__export(require("./results"));
var data_1 = require("./data");
exports.ExpectedVersion = data_1.ExpectedVersion;
exports.ReadDirection = data_1.ReadDirection;
var connection_1 = require("./connection");
exports.createConnection = connection_1.createConnection;
