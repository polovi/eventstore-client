"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const ClientMessages = require("./messages");
const results_1 = require("./results");
exports.makeWriteEventsHandler = (stream, expectedVersion) => (response) => {
    switch (response.result) {
        case ClientMessages.OperationResult.Success:
            return { nextExpectedVersion: response.lastEventNumber };
        case ClientMessages.OperationResult.WrongExpectedVersion:
            throw new errors_1.WrongExpectedVersionError(`Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${response.currentVersion}`);
        default:
            throw new Error(`Unexpected OperationResult: ${response.result}`);
    }
};
exports.makeReadEventHandler = (eventNumber) => ({ result, error, ...response }) => {
    switch (result) {
        case ClientMessages.ReadEventResult.Success:
            return { ...response, eventNumber, status: results_1.EventReadStatus.Success };
        case ClientMessages.ReadEventResult.NoStream:
            return { ...response, eventNumber, status: results_1.EventReadStatus.NoStream };
        case ClientMessages.ReadEventResult.NotFound:
            return { ...response, eventNumber, status: results_1.EventReadStatus.NotFound };
        case ClientMessages.ReadEventResult.Error:
            throw new errors_1.ServerError(error || '<no message>');
        default:
            throw new Error(`Unexpected ReadEventResult: ${result}`);
    }
};
exports.makeReadStremEventsHandler = (direction) => ({ result, error, ...response }) => {
    switch (result) {
        case ClientMessages.ReadStreamResult.Success:
            return { ...response, status: results_1.SliceReadStatus.Success, readDirection: direction };
        case ClientMessages.ReadStreamResult.NoStream:
            return { ...response, status: results_1.SliceReadStatus.NoStream, readDirection: direction };
        case ClientMessages.ReadStreamResult.Error:
            throw new errors_1.ServerError(error || '<no message>');
        default:
            throw new Error(`Unexpected ReadStreamResult: ${result}`);
    }
};
