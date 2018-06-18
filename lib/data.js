"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadStreamResult;
(function (ReadStreamResult) {
    ReadStreamResult[ReadStreamResult["Success"] = 0] = "Success";
    ReadStreamResult[ReadStreamResult["NoStream"] = 1] = "NoStream";
    ReadStreamResult[ReadStreamResult["Error"] = 4] = "Error";
})(ReadStreamResult = exports.ReadStreamResult || (exports.ReadStreamResult = {}));
var SliceReadStatus;
(function (SliceReadStatus) {
    SliceReadStatus[SliceReadStatus["Success"] = 0] = "Success";
    SliceReadStatus[SliceReadStatus["NoStream"] = 1] = "NoStream";
    SliceReadStatus[SliceReadStatus["Error"] = 3] = "Error";
})(SliceReadStatus = exports.SliceReadStatus || (exports.SliceReadStatus = {}));
