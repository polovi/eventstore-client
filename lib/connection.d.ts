import { EventData, PersistentSubscriptionSettings } from './data';
import { EventReadResult, PersistentSubscriptionCreateResult, StreamEventsSlice, WriteResult } from './results';
export interface IEventStoreConnection {
    appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>;
    readEvent(stream: string, eventNumber: number): Promise<EventReadResult>;
    readStreamEventsForward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>;
    readStreamEventsBackward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>;
    readAllEventsForward(position: any, count?: number): any;
    readAllEventsBackward(position: any, count?: number): any;
    createPersistantSubscription(stream: string, settings: PersistentSubscriptionSettings): Promise<PersistentSubscriptionCreateResult>;
}
export declare const createConnection: (endpoint: string) => IEventStoreConnection;
