"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const lambda = new aws_sdk_1.Lambda();
var InvokeCommand;
(function (InvokeCommand) {
    InvokeCommand["WriteEvents"] = "writeEvents";
    InvokeCommand["ReadStreamEventsForward"] = "readStreamEventsForward";
    InvokeCommand["ReadStreamEventsBackward"] = "readStreamEventsBackward";
})(InvokeCommand = exports.InvokeCommand || (exports.InvokeCommand = {}));
exports.sendCommand = async (endpoint, handler, command) => {
    const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(command) }).promise();
    const payload = JSON.parse(data.Payload);
    if (data.FunctionError) {
        throw Error(payload.errorMessage || '');
    }
    return handler(payload);
};
