"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
exports.readStreamEventsResponseHandler = ({ result, error, ...response }) => {
    const convert = result => {
        switch (result) {
            case data_1.ReadStreamResult.Success:
                return data_1.SliceReadStatus.Success;
            case data_1.ReadStreamResult.NoStream:
                return data_1.SliceReadStatus.NoStream;
            default:
                throw new Error(`Unexpected ReadEventResult: ${result}`);
        }
    };
    switch (result) {
        case data_1.ReadStreamResult.Success:
        case data_1.ReadStreamResult.NoStream:
            return {
                status: convert(result),
                stream: response.stream,
                events: response.events,
                fromEventVersion: response.fromEventVersion,
                nextEventVersion: response.nextEventVersion,
                lastEventVersion: response.lastEventVersion,
                isEndOfStream: response.isEndOfStream,
            };
        case data_1.ReadStreamResult.Error:
            throw new Error(error || '<no message>');
        default:
            throw new Error(`Unexpected ReadEventResult: ${result}`);
    }
};
exports.appendToStreamResponseHandler = ({ result, error, ...response }) => {
    switch (result) {
        case 0:
            return {
                lastEventVersion: response.lastEventVersion,
            };
        case 1:
            throw new Error(`Append failed due to WrongExpectedVersion. Stream: ${response.stream}, Expected version: {1}, Current version: {2}`);
        case 4:
            throw new Error(error || '<no message>');
        default:
            throw new Error(`Unexpected ReadEventResult: ${result}`);
    }
};
