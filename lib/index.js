"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./client"));
var data_1 = require("./data");
exports.SliceReadStatus = data_1.SliceReadStatus;
exports.ExpectedVersion = data_1.ExpectedVersion;
var ensure_1 = require("./ensure");
exports.ArgumentNullException = ensure_1.ArgumentNullException;
exports.ArgumentOutOfRangeException = ensure_1.ArgumentOutOfRangeException;
