export declare class ArgumentNullException extends Error {
    constructor(argumentName?: string, msg?: string);
}
export declare class ArgumentOutOfRangeException extends Error {
    constructor(argumentName?: string, msg?: string);
}
export declare const notNullOrEmpty: (value: string, argumentName: string) => void;
export declare const notEmpty: (value: any[], argumentName: string) => void;
