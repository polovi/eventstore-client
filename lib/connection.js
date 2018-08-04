"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ensure = require("./utils/ensure");
const errors_1 = require("./errors");
const transport_1 = require("./transport");
const data_1 = require("./data");
const handlers_1 = require("./handlers");
exports.createConnection = (endpoint) => ({
    appendToStream: async (stream, expectedVersion, events) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        Ensure.notEmpty(events, 'events');
        const handler = handlers_1.makeWriteEventsHandler(stream, expectedVersion);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.WriteEvents,
            data: { stream, expectedVersion, events },
        });
    },
    readEvent: async (stream, eventNumber) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        if (eventNumber < -1)
            throw new errors_1.ArgumentOutOfRangeException('eventNumber');
        const handler = handlers_1.makeReadEventHandler(eventNumber);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.ReadEvent,
            data: { stream, eventNumber },
        });
    },
    readStreamEventsForward: async (stream, start, count) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        Ensure.nonNegative(start, 'start');
        count && Ensure.positive(count, 'count');
        const handler = handlers_1.makeReadStremEventsHandler(data_1.ReadDirection.Forward);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.ReadStreamEventsForward,
            data: { stream, start, count },
        });
    },
    readStreamEventsBackward: async (stream, start, count) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        count && Ensure.positive(count, 'count');
        const handler = handlers_1.makeReadStremEventsHandler(data_1.ReadDirection.Backward);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.ReadStreamEventsBackward,
            data: { stream, start, count },
        });
    },
    readAllEventsForward: (position, count) => {
        throw new Error('Not implemented');
    },
    readAllEventsBackward: (position, count) => {
        throw new Error('Not implemented');
    },
});
