"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const Ensure = require("./ensure");
const responseHandlers_1 = require("./responseHandlers");
const lambda = new aws_sdk_1.Lambda();
const invoke = async (functionName, data) => lambda
    .invoke({ FunctionName: functionName, Payload: JSON.stringify(data) })
    .promise()
    .then(data => {
    const payload = JSON.parse(data.Payload);
    if (data.FunctionError) {
        throw new Error(payload.errorMessage || '');
    }
    return payload;
});
exports.sendCommand = async (endpoint, command, data, handler) => invoke(endpoint, { command, data }).then(handler);
exports.createClient = (endpoint) => ({
    readStreamEventsForward: async (stream, start = 0) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        return exports.sendCommand(endpoint, 'readStreamEventsForward', { stream, start }, responseHandlers_1.readStreamEventsResponseHandler);
    },
    appendToStream: async (stream, expectedVersion, events) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        return exports.sendCommand(endpoint, 'appendToStream', { stream, expectedVersion, events }, responseHandlers_1.appendToStreamResponseHandler);
    },
});
