export interface Event<T extends object> {
    eventType: string;
    data: T;
    metadata?: object;
}
export interface ResolvedEvent<T extends object> extends Event<T> {
    eventId: string;
    eventVersion: number;
}
