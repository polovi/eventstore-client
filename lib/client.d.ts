import { WriteResult, EventReadResult, StreamEventsReadResult } from './results';
import { Event } from './events';
export declare enum ExpectedVersion {
    ANY = -1,
    NO_STREAM = 0,
}
export declare class ClientError extends Error {
}
export declare class NoStreamError extends Error {
}
export declare class WrongExpectedVersionError extends Error {
}
export declare const createClient: (endpoint: string) => {
    readEvent: (stream: string, eventVersion: number) => Promise<EventReadResult>;
    readStreamEvents: (stream: string, start?: number | undefined) => Promise<StreamEventsReadResult>;
    appendToStream: (stream: string, expectedVersion: number, events: Event<any>[]) => Promise<WriteResult>;
};
