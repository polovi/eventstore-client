import { Event } from './data';
export declare const sendCommand: (endpoint: string, command: string, data: any, handler: any) => Promise<any>;
export declare const createClient: (endpoint: string) => {
    readStreamEventsForward: (stream: string, start?: number) => Promise<any>;
    appendToStream: (stream: string, expectedVersion: number, events: Event<any>[]) => Promise<any>;
};
