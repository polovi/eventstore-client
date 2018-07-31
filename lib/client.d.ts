import { WriteResult } from './results';
import { EventData } from './event';
export interface IEventStoreClient {
    appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>;
    readEvent(stream: string, eventNumber: number): Promise<any>;
    readStreamEventsForward(stream: string, start: number, count?: number): Promise<any>;
    readStreamEventsBackward(stream: string, start: number, count?: number): Promise<any>;
}
export declare const makeClient: (endpoint: string) => IEventStoreClient;
