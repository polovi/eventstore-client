import { ArgumentNullException, ArgumentOutOfRangeException } from '../errors'

export const notNullOrEmpty = (argument: string, argumentName: string) => {
  if (!argument) {
    throw new ArgumentNullException(argumentName)
  }
}

export const notEmpty = <T>(argument: T[], argumentName: string) => {
  if (!argument || !argument.length) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-empty array.`)
  }
}

export const positive = (number: number, argumentName: string) => {
  if (number <= 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`)
  }
}

export const nonNegative = (number: number, argumentName: string) => {
  if (number < 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-negative.`)
  }
}
