"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.notNullOrEmpty = (value, argumentName) => {
    if (!value) {
        throw new ArgumentNullException(argumentName);
    }
};
exports.notEmpty = (value, argumentName) => {
    if (!value || !Array.isArray(value) || !value.length) {
        throw new ArgumentOutOfRangeException(argumentName, `${argumentName}  should be non-empty array.`);
    }
};
