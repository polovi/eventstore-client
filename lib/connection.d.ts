import { EventData } from './data';
import { WriteResult, EventReadResult, StreamEventsSlice } from './results';
export interface IEventStoreConnection {
    appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>;
    readEvent(stream: string, eventNumber: number): Promise<EventReadResult>;
    readStreamEventsForward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>;
    readStreamEventsBackward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>;
    readAllEventsForward(position: any, count?: number): any;
    readAllEventsBackward(position: any, count?: number): any;
}
export declare const createConnection: (endpoint: string) => IEventStoreConnection;
