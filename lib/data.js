"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvocationCommand;
(function (InvocationCommand) {
    InvocationCommand[InvocationCommand["WriteEvents"] = 130] = "WriteEvents";
    InvocationCommand[InvocationCommand["ReadEvent"] = 176] = "ReadEvent";
    InvocationCommand[InvocationCommand["ReadStreamEventsForward"] = 178] = "ReadStreamEventsForward";
    InvocationCommand[InvocationCommand["ReadStreamEventsBackward"] = 180] = "ReadStreamEventsBackward";
    InvocationCommand[InvocationCommand["ReadAllEventsForward"] = 182] = "ReadAllEventsForward";
    InvocationCommand[InvocationCommand["ReadAllEventsBackward"] = 184] = "ReadAllEventsBackward";
    InvocationCommand[InvocationCommand["CreatePersistentSubscription"] = 200] = "CreatePersistentSubscription";
    InvocationCommand[InvocationCommand["DeletePersistentSubscription"] = 202] = "DeletePersistentSubscription";
})(InvocationCommand = exports.InvocationCommand || (exports.InvocationCommand = {}));
var ExpectedVersion;
(function (ExpectedVersion) {
    ExpectedVersion[ExpectedVersion["Any"] = -2] = "Any";
    ExpectedVersion[ExpectedVersion["NoStream"] = -1] = "NoStream";
})(ExpectedVersion = exports.ExpectedVersion || (exports.ExpectedVersion = {}));
var ReadDirection;
(function (ReadDirection) {
    ReadDirection["Forward"] = "Forward";
    ReadDirection["Backward"] = "Backward";
})(ReadDirection = exports.ReadDirection || (exports.ReadDirection = {}));
