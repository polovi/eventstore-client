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
export declare enum StartFrom {
    Current = -1,
    Beginning = 0
}
export interface PersistentSubscriptionSettings {
    startFrom: StartFrom | number;
    service: 'kinesis' | 'sqs' | 'sns';
}
export declare enum PersistentSubscriptionCreateStatus {
    Success = 0,
    AlreadyExists = 1,
    Failure = 2
}
