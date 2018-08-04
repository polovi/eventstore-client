export declare enum InvocationCommand {
    WriteEvents = 130,
    ReadEvent = 176,
    ReadStreamEventsForward = 178,
    ReadStreamEventsBackward = 180,
    ReadAllEventsForward = 182,
    ReadAllEventsBackward = 184,
    CreatePersistentSubscription = 200,
    DeletePersistentSubscription = 202
}
export declare enum ExpectedVersion {
    Any = -2,
    NoStream = -1
}
export declare enum ReadDirection {
    Forward = "Forward",
    Backward = "Backward"
}
export interface EventData {
    eventType: string;
    data: object;
    metadata?: object;
}
export interface EventRecord extends EventData {
    eventId: string;
    eventNumber: number;
}
