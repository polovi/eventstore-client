"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const errors_1 = require("./errors");
const handlers_1 = require("./handlers");
const transport_1 = require("./transport");
const Ensure = require("./utils/Ensure");
exports.createConnection = (endpoint) => ({
    appendToStream: async (stream, expectedVersion, events) => {
        Ensure.notNull(stream, 'stream');
        Ensure.notEmpty(events, 'events');
        const handler = handlers_1.makeWriteEventsHandler(stream, expectedVersion);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.WriteEvents,
            data: { stream, expectedVersion, events },
        });
    },
    readEvent: async (stream, eventNumber) => {
        Ensure.notNull(stream, 'stream');
        if (eventNumber < -1)
            throw new errors_1.ArgumentOutOfRangeException('eventNumber');
        const handler = handlers_1.makeReadEventHandler(eventNumber);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.ReadEvent,
            data: { stream, eventNumber },
        });
    },
    readStreamEventsForward: async (stream, start, count) => {
        Ensure.notNull(stream, 'stream');
        Ensure.nonNegative(start, 'start');
        count && Ensure.positive(count, 'count');
        const handler = handlers_1.makeReadStremEventsHandler(data_1.ReadDirection.Forward);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.ReadStreamEventsForward,
            data: { stream, start, count },
        });
    },
    readStreamEventsBackward: async (stream, start, count) => {
        Ensure.notNull(stream, 'stream');
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
    createPersistantSubscription: (stream, settings) => {
        Ensure.notNull(stream, 'stream');
        Ensure.notNull(settings, 'settings');
        const handler = handlers_1.makeCreatePersistantSubscriptionHandler(stream);
        return transport_1.sendMessage(endpoint, handler, {
            command: data_1.InvocationCommand.CreatePersistentSubscription,
            data: { stream, settings },
        });
    },
});
