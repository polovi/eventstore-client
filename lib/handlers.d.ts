import { WriteEventsCompleted, ReadStreamEventsCompleted } from './messages';
import { SliceReadStatus } from './results';
export declare const makeWriteEventsHandler: (stream: string, expectedVersion: number) => (response: WriteEventsCompleted) => {
    nextExpectedVersion: number;
};
export declare const makeReadStreamEventsHandler: (stream: string, fromEventVersion: number) => ({ result, error, ...response }: ReadStreamEventsCompleted) => {
    status: SliceReadStatus;
    events: import("../../../../../Volumes/External/AWS/eventstore-client/src/events").ResolvedEvent[];
    stream: string;
    fromEventVersion: number;
    nextEventVersion: number;
    lastEventVersion: number;
    isEndOfStream: boolean;
};
