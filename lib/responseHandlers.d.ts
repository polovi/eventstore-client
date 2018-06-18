import { StreamEventsSlice, WriteResult } from './data';
export declare const readStreamEventsResponseHandler: ({ result, error, ...response }: {
    [x: string]: any;
    result: any;
    error: any;
}) => StreamEventsSlice;
export declare const appendToStreamResponseHandler: ({ result, error, ...response }: {
    [x: string]: any;
    result: any;
    error: any;
}) => WriteResult;
