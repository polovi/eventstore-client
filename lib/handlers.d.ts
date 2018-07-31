import { WriteEventsCompleted, ReadEventCompleted, ReadStreamEventsCompleted } from './messages';
import { EventReadStatus, SliceReadStatus } from './results';
import { ReadDirection } from './data';
export declare const makeWriteEventsHandler: (stream: string, expectedVersion: number) => (response: WriteEventsCompleted) => {
    nextExpectedVersion: number;
};
export declare const makeReadEventHandler: (eventNumber: number) => ({ result, error, ...response }: ReadEventCompleted) => {
    eventNumber: number;
    status: EventReadStatus;
    stream: string;
    event: import("./event").EventRecord;
};
export declare const readStreamEventsForwardHandler: (response: ReadStreamEventsCompleted) => {
    readDirection: ReadDirection;
    status: SliceReadStatus;
    stream: string;
    events: import("./event").EventRecord[];
    fromEventNumber: number;
    nextEventNumber: number;
    lastEventNumber: number;
    isEndOfStream: boolean;
};
export declare const readStreamEventsBackwarddHandler: (response: ReadStreamEventsCompleted) => {
    readDirection: ReadDirection;
    status: SliceReadStatus;
    stream: string;
    events: import("./event").EventRecord[];
    fromEventNumber: number;
    nextEventNumber: number;
    lastEventNumber: number;
    isEndOfStream: boolean;
};
