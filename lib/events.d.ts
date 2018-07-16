export interface EventData {
    eventType: string;
    data: object;
    metadata?: object;
}
export interface Event extends EventData {
}
export interface ResolvedEvent extends EventData {
    eventId: string;
    eventVersion: number;
}
export declare const EventData: (eventType: string, data: object, metadata?: object) => EventData;
