export declare const sendMessage: <TResult, TResponse>(endpoint: string, handler: (response: TResponse) => TResult, msg: any) => Promise<TResult>;
