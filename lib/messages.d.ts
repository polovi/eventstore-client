import { ResolvedEvent } from './events';
export declare enum ReadStreamResult {
    Success = 0,
    NoStream = 1,
    Error = 2
}
export interface ReadStreamEventsCompleted {
    result: ReadStreamResult;
    events: ResolvedEvent[];
    stream: string;
    fromEventVersion: number;
    nextEventVersion: number;
    lastEventVersion: number;
    isEndOfStream: boolean;
    error?: string;
}
export declare enum WriteResult {
    Success = 0,
    WrongExpectedVersion = 1,
    Error = 2
}
export interface WriteEventsCompleted {
    result: WriteResult;
    lastEventVersion: number;
    commitPosition?: number;
    currentVersion?: number;
}
