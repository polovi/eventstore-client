"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ensure = require("./ensure");
const service_1 = require("./service");
const handlers_1 = require("./handlers");
exports.makeClient = (endpoint) => ({
    appendToStream: async (stream, expectedVersion, events) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        Ensure.notEmpty(events, 'events');
        const handler = handlers_1.makeWriteEventsHandler(stream, expectedVersion);
        return service_1.sendCommand(endpoint, handler, {
            command: service_1.InvokeCommand.WriteEvents,
            data: { stream, expectedVersion, events },
        });
    },
    readStreamEventsForward: async (stream, start) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        const handler = handlers_1.makeReadStreamEventsHandler(stream, start);
        return service_1.sendCommand(endpoint, handler, {
            command: service_1.InvokeCommand.ReadStreamEventsForward,
            data: { stream, start },
        });
    },
});
