"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const results_1 = require("./results");
const lambda = new aws_sdk_1.Lambda();
var ExpectedVersion;
(function (ExpectedVersion) {
    ExpectedVersion[ExpectedVersion["ANY"] = -1] = "ANY";
    ExpectedVersion[ExpectedVersion["NO_STREAM"] = 0] = "NO_STREAM";
})(ExpectedVersion = exports.ExpectedVersion || (exports.ExpectedVersion = {}));
class ClientError extends Error {
}
exports.ClientError = ClientError;
class NoStreamError extends Error {
}
exports.NoStreamError = NoStreamError;
class WrongExpectedVersionError extends Error {
}
exports.WrongExpectedVersionError = WrongExpectedVersionError;
const invoke = async (functionName, data) => lambda
    .invoke({ FunctionName: functionName, Payload: JSON.stringify(data) })
    .promise()
    .then(res => {
    const payload = JSON.parse(data.Payload);
    if (data.FunctionError) {
        throw new Error(payload.errorMessage || '');
    }
    return payload;
});
const mapErrorClass = error => {
    switch (Number(error.code)) {
        case 404:
            return new NoStreamError(error.message);
        case 409:
            return new WrongExpectedVersionError(error.message);
        default:
            return new ClientError(error.message);
    }
};
const sendCommand = async (endpoint, cmd) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error, ...data } = await invoke(endpoint, cmd);
            return error ? reject(mapErrorClass(error)) : resolve(data);
        }
        catch (error) {
            reject(new ClientError(error.message));
        }
    });
};
exports.createClient = (endpoint) => ({
    readEvent: async (stream, eventVersion) => {
        const { event } = await sendCommand(endpoint, {
            action: 'readEvent',
            data: { stream, eventVersion },
        });
        return results_1.EventReadResult(stream, eventVersion, event);
    },
    readStreamEvents: async (stream, start) => {
        const { fromEventVersion, lastEventVersion, events } = await sendCommand(endpoint, {
            action: 'readStreamEvents',
            data: { stream, start },
        });
        return results_1.StreamEventsReadResult(stream, Number(fromEventVersion), Number(lastEventVersion), events);
    },
    appendToStream: async (stream, expectedVersion, events) => {
        const { nextExpectedVersion } = await sendCommand(endpoint, {
            action: 'appendToStream',
            data: { stream, expectedVersion, events },
        });
        return results_1.WriteResult(nextExpectedVersion);
    },
});
