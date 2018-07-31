"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const messages_1 = require("./messages");
const results_1 = require("./results");
exports.makeWriteEventsHandler = (stream, expectedVersion) => (response) => {
    switch (response.result) {
        case messages_1.OperationResult.Success:
            return { nextExpectedVersion: response.lastEventNumber };
        case messages_1.OperationResult.WrongExpectedVersion:
            throw new errors_1.WrongExpectedVersionError(`Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${response.currentVersion}`);
        default:
            throw new Error(`Unexpected OperationResult: ${response.result}`);
    }
};
exports.makeReadEventHandler = (eventNumber) => ({ result, error, ...response }) => {
    switch (result) {
        case messages_1.ReadEventResult.Success:
            return { ...response, eventNumber, status: results_1.EventReadStatus.Success };
        case messages_1.ReadEventResult.NoStream:
            return { ...response, eventNumber, status: results_1.EventReadStatus.NoStream };
        case messages_1.ReadEventResult.NotFound:
            return { ...response, eventNumber, status: results_1.EventReadStatus.NotFound };
        case messages_1.ReadEventResult.Error:
            throw new errors_1.ServerError(error || '<no message>');
        default:
            throw new Error(`Unexpected ReadEventResult: ${result}`);
    }
};
const handleReadStremEventsResponse = ({ result, error, ...response }) => {
    switch (result) {
        case messages_1.ReadStreamResult.Success:
            return { ...response, status: results_1.SliceReadStatus.Success };
        case messages_1.ReadStreamResult.NoStream:
            return { ...response, status: results_1.SliceReadStatus.NoStream };
        case messages_1.ReadStreamResult.Error:
            throw new errors_1.ServerError(error || '<no message>');
        default:
            throw Error(`Unexpected ReadStreamResult: ${result}`);
    }
};
exports.readStreamEventsForwardHandler = (response) => {
    return {
        ...handleReadStremEventsResponse(response),
        readDirection: results_1.ReadDirection.Forward,
    };
};
exports.readStreamEventsBackwarddHandler = (response) => {
    return {
        ...handleReadStremEventsResponse(response),
        readDirection: results_1.ReadDirection.Backward,
    };
};
