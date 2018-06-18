"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpectedVersion;
(function (ExpectedVersion) {
    ExpectedVersion[ExpectedVersion["Any"] = -2] = "Any";
    ExpectedVersion[ExpectedVersion["NoStream"] = -1] = "NoStream";
})(ExpectedVersion = exports.ExpectedVersion || (exports.ExpectedVersion = {}));
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
