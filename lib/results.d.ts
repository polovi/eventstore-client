import { ResolvedEvent } from './events';
export interface WriteResult {
    nextExpectedVersion: number;
}
export declare const WriteResult: (nextExpectedVersion: number) => WriteResult;
export interface EventReadResult {
    stream: string;
    eventVersion: number;
    event: ResolvedEvent<any>;
}
export declare const EventReadResult: (stream: string, eventVersion: number, event: ResolvedEvent<any>) => EventReadResult;
export interface StreamEventsReadResult {
    stream: string;
    fromEventVersion: number;
    lastEventVersion: number;
    events: ResolvedEvent<any>[];
}
export declare const StreamEventsReadResult: (stream: string, fromEventVersion: number, lastEventVersion: number, events: ResolvedEvent<any>[]) => {
    stream: string;
    fromEventVersion: number;
    lastEventVersion: number;
    events: ResolvedEvent<any>[];
};
