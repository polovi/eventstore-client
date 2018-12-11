import { ReadDirection } from './data';
import * as ClientMessages from './messages';
import { EventReadResult, PersistentSubscriptionCreateResult, StreamEventsSlice, WriteResult } from './results';
export declare const makeWriteEventsHandler: (stream: string, expectedVersion: number) => (response: ClientMessages.WriteEventsCompleted) => WriteResult;
export declare const makeReadEventHandler: (eventNumber: number) => ({ result, error, ...response }: ClientMessages.ReadEventCompleted) => EventReadResult;
export declare const makeReadStremEventsHandler: (direction: ReadDirection) => ({ result, error, ...response }: ClientMessages.ReadStreamEventsCompleted) => StreamEventsSlice;
export declare const makeCreatePersistantSubscriptionHandler: (stream: any) => (result: ClientMessages.CreatePersistentSubscriptionCompleted) => PersistentSubscriptionCreateResult;
