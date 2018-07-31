import { EventRecord } from './event';
import { ReadDirection } from './data';
export interface WriteResult {
    nextExpectedVersion: number;
}
export declare enum EventReadStatus {
    Success = 1,
    NotFound = 2,
    NoStream = 3
}
export interface EventReadResult {
    result: EventReadStatus;
    stream: string;
    eventNumber: number;
    event?: any;
}
export declare enum SliceReadStatus {
    Success = 1,
    NoStream = 2
}
export interface StreamEventsSlice {
    result: SliceReadStatus;
    stream: string;
    readDirection: ReadDirection;
    events: EventRecord[];
    fromEventNumber: number;
    nextEventNumber: number;
    lastEventNumber: number;
    isEndOfStream: boolean;
}
