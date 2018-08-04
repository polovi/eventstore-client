"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.notNullOrEmpty = (argument, argumentName) => {
    if (!argument) {
        throw new errors_1.ArgumentNullException(argumentName);
    }
};
exports.notEmpty = (argument, argumentName) => {
    if (!argument || !argument.length) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-empty array.`);
    }
};
exports.positive = (number, argumentName) => {
    if (number <= 0) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`);
    }
};
exports.nonNegative = (number, argumentName) => {
    if (number < 0) {
        throw new errors_1.ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-negative.`);
    }
};
