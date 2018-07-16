"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const results_1 = require("./results");
const errors_1 = require("./errors");
exports.makeWriteEventsHandler = (stream, expectedVersion) => (response) => {
    switch (response.result) {
        case messages_1.WriteResult.Success:
            return { nextExpectedVersion: response.lastEventVersion };
        case messages_1.WriteResult.WrongExpectedVersion:
            const err = `Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${response.currentVersion}`;
            throw new errors_1.WrongExpectedVersionError(err);
        default:
            throw new Error(`Unexpected ReadEventResult: ${response.result}`);
    }
};
exports.makeReadStreamEventsHandler = (stream, fromEventVersion) => ({ result, error, ...response }) => {
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
