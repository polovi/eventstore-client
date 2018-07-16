import { StreamEventsSlice, WriteResult } from './results';
import { EventData } from './events';
export interface IEventStoreClient {
    readStreamEventsForward(stream: string, start: number): Promise<StreamEventsSlice>;
    appendToStream?(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>;
}
export declare const makeClient: (endpoint: string) => IEventStoreClient;
