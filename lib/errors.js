"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrongExpectedVersionError extends Error {
}
exports.WrongExpectedVersionError = WrongExpectedVersionError;
class ServerError extends Error {
}
exports.ServerError = ServerError;
class ArgumentNullException extends Error {
    constructor(argumentName, msg) {
        super(`${msg || 'Value cannot be null.'}${argumentName ? ` Parameter name: ${argumentName}` : ''}`);
    }
}
exports.ArgumentNullException = ArgumentNullException;
class ArgumentOutOfRangeException extends Error {
    constructor(argumentName, msg) {
        super(`${msg || 'Specified argument was out of the range of valid values.'}${argumentName ? ` Parameter name: ${argumentName}` : ''}`);
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
