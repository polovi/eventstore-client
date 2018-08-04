import * as ClientMessages from './messages';
import { EventReadResult, WriteResult, StreamEventsSlice } from './results';
import { ReadDirection } from './data';
export declare const makeWriteEventsHandler: (stream: string, expectedVersion: number) => (response: ClientMessages.WriteEventsCompleted) => WriteResult;
export declare const makeReadEventHandler: (eventNumber: number) => ({ result, error, ...response }: ClientMessages.ReadEventCompleted) => EventReadResult;
export declare const makeReadStremEventsHandler: (direction: ReadDirection) => ({ result, error, ...response }: ClientMessages.ReadStreamEventsCompleted) => StreamEventsSlice;
