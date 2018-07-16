import { ResolvedEvent } from './events';
export declare enum SliceReadStatus {
    Success = 0,
    NoStream = 1,
    Error = 2
}
export interface StreamEventsSlice {
    status: SliceReadStatus;
    stream: string;
    events: ResolvedEvent[];
    fromEventVersion: number;
    nextEventVersion: number;
    lastEventVersion: number;
    isEndOfStream: boolean;
}
export interface WriteResult {
    nextExpectedVersion: number;
}
