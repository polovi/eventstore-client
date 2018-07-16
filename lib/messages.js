"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadStreamResult;
(function (ReadStreamResult) {
    ReadStreamResult[ReadStreamResult["Success"] = 0] = "Success";
    ReadStreamResult[ReadStreamResult["NoStream"] = 1] = "NoStream";
    ReadStreamResult[ReadStreamResult["Error"] = 2] = "Error";
})(ReadStreamResult = exports.ReadStreamResult || (exports.ReadStreamResult = {}));
var WriteResult;
(function (WriteResult) {
    WriteResult[WriteResult["Success"] = 0] = "Success";
    WriteResult[WriteResult["WrongExpectedVersion"] = 1] = "WrongExpectedVersion";
    WriteResult[WriteResult["Error"] = 2] = "Error";
})(WriteResult = exports.WriteResult || (exports.WriteResult = {}));
