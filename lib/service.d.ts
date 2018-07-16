export declare enum InvokeCommand {
    WriteEvents = "writeEvents",
    ReadStreamEventsForward = "readStreamEventsForward",
    ReadStreamEventsBackward = "readStreamEventsBackward"
}
export declare const sendCommand: <TResult>(endpoint: string, handler: any, command: any) => Promise<TResult>;
