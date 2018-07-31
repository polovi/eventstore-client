export interface EventData {
    eventType: string;
    data: object;
    metadata?: object;
}
export declare const EventData: (eventType: string, data: object, metadata?: object | undefined) => {
    eventType: string;
    data: object;
    metadata: object | undefined;
};
export interface EventRecord extends EventData {
    eventId: string;
    eventNumber: string;
}
