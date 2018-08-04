"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const lambda = new aws_sdk_1.Lambda();
exports.sendMessage = async (endpoint, handler, msg) => {
    const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(msg) }).promise();
    const payload = JSON.parse(data.Payload);
    if (data.FunctionError) {
        throw Error(payload.errorMessage || '');
    }
    return handler(payload);
};
