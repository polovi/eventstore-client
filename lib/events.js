"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventData = (eventType, data, metadata = {}) => ({
    eventType,
    data,
    metadata,
});
