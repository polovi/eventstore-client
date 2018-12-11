"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.notNull = (argument, argumentName) => {
    if (!argument) {
        throw new errors_1.ArgumentNullException(argumentName);
    }
};
exports.notEmpty = (argument, argumentName) => {
    if (!argument || !argument.length) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-empty array.`);
    }
};
exports.positive = (value, argumentName) => {
    if (value <= 0) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`);
    }
};
exports.nonNegative = (value, argumentName) => {
    if (value < 0) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-negative.`);
    }
};
