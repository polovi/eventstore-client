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
