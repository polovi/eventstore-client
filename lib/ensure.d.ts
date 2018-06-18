export declare class ArgumentNullException extends Error {
    constructor(argumentName?: string, msg?: string);
}
export declare class ArgumentOutOfRangeException extends Error {
    constructor(argumentName?: string, msg?: string);
}
export declare const notNull: <T>(value: T, argumentName: string) => void;
export declare const notNullOrEmpty: (value: string, argumentName: string) => void;
export declare const positive: (value: number, argumentName: string) => void;
export declare const nonNegative: (value: number, argumentName: string) => void;
