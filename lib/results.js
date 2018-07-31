"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventReadStatus;
(function (EventReadStatus) {
    EventReadStatus[EventReadStatus["Success"] = 1] = "Success";
    EventReadStatus[EventReadStatus["NotFound"] = 2] = "NotFound";
    EventReadStatus[EventReadStatus["NoStream"] = 3] = "NoStream";
})(EventReadStatus = exports.EventReadStatus || (exports.EventReadStatus = {}));
var SliceReadStatus;
(function (SliceReadStatus) {
    SliceReadStatus[SliceReadStatus["Success"] = 1] = "Success";
    SliceReadStatus[SliceReadStatus["NoStream"] = 2] = "NoStream";
})(SliceReadStatus = exports.SliceReadStatus || (exports.SliceReadStatus = {}));
