"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationResult;
(function (OperationResult) {
    OperationResult[OperationResult["Success"] = 0] = "Success";
    OperationResult[OperationResult["WrongExpectedVersion"] = 1] = "WrongExpectedVersion";
})(OperationResult = exports.OperationResult || (exports.OperationResult = {}));
var ReadEventResult;
(function (ReadEventResult) {
    ReadEventResult[ReadEventResult["Success"] = 1] = "Success";
    ReadEventResult[ReadEventResult["NotFound"] = 1] = "NotFound";
    ReadEventResult[ReadEventResult["NoStream"] = 2] = "NoStream";
    ReadEventResult[ReadEventResult["Error"] = 3] = "Error";
})(ReadEventResult = exports.ReadEventResult || (exports.ReadEventResult = {}));
var ReadStreamResult;
(function (ReadStreamResult) {
    ReadStreamResult[ReadStreamResult["Success"] = 0] = "Success";
    ReadStreamResult[ReadStreamResult["NoStream"] = 1] = "NoStream";
    ReadStreamResult[ReadStreamResult["Error"] = 2] = "Error";
})(ReadStreamResult = exports.ReadStreamResult || (exports.ReadStreamResult = {}));
var CreatePersistentSubscriptionResult;
(function (CreatePersistentSubscriptionResult) {
    CreatePersistentSubscriptionResult[CreatePersistentSubscriptionResult["Success"] = 0] = "Success";
    CreatePersistentSubscriptionResult[CreatePersistentSubscriptionResult["AlreadyExists"] = 1] = "AlreadyExists";
    CreatePersistentSubscriptionResult[CreatePersistentSubscriptionResult["Fail"] = 2] = "Fail";
})(CreatePersistentSubscriptionResult = exports.CreatePersistentSubscriptionResult || (exports.CreatePersistentSubscriptionResult = {}));
