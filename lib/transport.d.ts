export declare enum InvocationCommand {
    WriteEvents = 130,
    ReadEvent = 176,
    ReadStreamEventsForward = 178,
    ReadStreamEventsBackward = 180
}
export declare const sendCommand: <TResult>(endpoint: string, handler: any, command: any) => Promise<TResult>;
