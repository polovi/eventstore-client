import { Event, StreamEventsSlice, WriteResult } from './data';
export interface IEventStoreClient {
    readStreamEventsForward(stream: string, start: number): Promise<StreamEventsSlice>;
    appendToStream(stream: string, expectedVersion: number, events: Event[]): Promise<WriteResult>;
}
export declare const sendCommand: (endpoint: string, command: string, data: any, handler: any) => Promise<any>;
export declare const createClient: (endpoint: string) => IEventStoreClient;
