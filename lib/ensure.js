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
exports.notNull = (value, argumentName) => {
    if (value === null) {
        throw new ArgumentNullException(argumentName);
    }
};
exports.notNullOrEmpty = (value, argumentName) => {
    if (!value) {
        throw new ArgumentNullException(argumentName);
    }
};
exports.positive = (value, argumentName) => {
    if (value <= 0) {
        throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`);
    }
};
exports.nonNegative = (value, argumentName) => {
    if (value < 0) {
        throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non negative.`);
    }
};
