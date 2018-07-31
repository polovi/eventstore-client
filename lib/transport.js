"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const lambda = new aws_sdk_1.Lambda();
var InvocationCommand;
(function (InvocationCommand) {
    InvocationCommand[InvocationCommand["WriteEvents"] = 130] = "WriteEvents";
    InvocationCommand[InvocationCommand["ReadEvent"] = 176] = "ReadEvent";
    InvocationCommand[InvocationCommand["ReadStreamEventsForward"] = 178] = "ReadStreamEventsForward";
    InvocationCommand[InvocationCommand["ReadStreamEventsBackward"] = 180] = "ReadStreamEventsBackward";
})(InvocationCommand = exports.InvocationCommand || (exports.InvocationCommand = {}));
exports.sendCommand = async (endpoint, handler, command) => {
    const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(command) }).promise();
    const payload = JSON.parse(data.Payload);
    if (data.FunctionError) {
        throw Error(payload.errorMessage || '');
    }
    return handler(payload);
};
