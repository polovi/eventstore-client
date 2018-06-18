export interface Event {
    eventType: string;
    data: object;
    metadata?: object;
}
export declare enum ReadStreamResult {
    Success = 0,
    NoStream = 1,
    Error = 4
}
export interface ReadStreamResponse {
    result: ReadStreamResult;
    stream: string;
    events: Event[];
    fromEventVersion: number;
    nextEventVersion: number;
    lastEventVersion: number;
    isEndOfStream: boolean;
    error?: string;
}
export declare enum SliceReadStatus {
    Success = 0,
    NoStream = 1,
    Error = 3
}
export interface StreamEventsSlice {
    status: SliceReadStatus;
    stream: string;
    events: Event[];
    fromEventVersion: number;
    nextEventVersion: number;
    lastEventVersion: number;
    isEndOfStream: boolean;
}
