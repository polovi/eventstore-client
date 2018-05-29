"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteResult = (nextExpectedVersion) => ({
    nextExpectedVersion,
});
exports.EventReadResult = (stream, eventVersion, event) => ({
    stream,
    eventVersion,
    event,
});
exports.StreamEventsReadResult = (stream, fromEventVersion, lastEventVersion, events) => ({ stream, fromEventVersion, lastEventVersion, events });
