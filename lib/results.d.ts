import { EventRecord, PersistentSubscriptionCreateStatus, ReadDirection } from './data';
export interface WriteResult {
    nextExpectedVersion: number;
}
export declare enum EventReadStatus {
    Success = 1,
    NotFound = 2,
    NoStream = 3
}
export interface EventReadResult {
    status: EventReadStatus;
    stream: string;
    eventNumber: number;
    event?: EventRecord;
}
export declare enum SliceReadStatus {
    Success = 1,
    NoStream = 2
}
export interface StreamEventsSlice {
    status: SliceReadStatus;
    stream: string;
    readDirection: ReadDirection;
    events: EventRecord[];
    fromEventNumber: number;
    nextEventNumber: number;
    lastEventNumber: number;
    isEndOfStream: boolean;
}
export interface PersistentSubscriptionCreateResult {
    status: PersistentSubscriptionCreateStatus;
}
