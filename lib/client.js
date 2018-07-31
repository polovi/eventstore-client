"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ensure = require("./ensure");
const errors_1 = require("./errors");
const transport_1 = require("./transport");
const handlers_1 = require("./handlers");
exports.makeClient = (endpoint) => ({
    appendToStream: async (stream, expectedVersion, events) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        Ensure.notNullOrEmptyArray(events, 'events');
        return transport_1.sendCommand(endpoint, handlers_1.makeWriteEventsHandler(stream, expectedVersion), {
            command: transport_1.InvocationCommand.WriteEvents,
            data: { stream, expectedVersion, events },
        });
    },
    readEvent: async (stream, eventNumber) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        if (eventNumber < -1)
            throw new errors_1.ArgumentOutOfRangeException('eventNumber');
        return transport_1.sendCommand(endpoint, handlers_1.makeReadEventHandler(eventNumber), {
            command: transport_1.InvocationCommand.ReadEvent,
            data: { stream, eventNumber },
        });
    },
    readStreamEventsForward: async (stream, start, count) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        Ensure.positive(start, 'start');
        count && Ensure.nonNegative(count, 'count');
        return transport_1.sendCommand(endpoint, handlers_1.readStreamEventsForwardHandler, {
            command: transport_1.InvocationCommand.ReadStreamEventsForward,
            data: { stream, start, count },
        });
    },
    readStreamEventsBackward: async (stream, start, count) => {
        Ensure.notNullOrEmpty(stream, 'stream');
        count && Ensure.positive(count, 'count');
        return transport_1.sendCommand(endpoint, handlers_1.readStreamEventsBackwarddHandler, {
            command: transport_1.InvocationCommand.ReadStreamEventsBackward,
            data: { stream, start, count },
        });
    },
});
