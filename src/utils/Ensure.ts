import { ArgumentNullException, ArgumentOutOfRangeException } from '../errors'

export const notNull = (argument: any, argumentName: string) => {
  if (!argument) {
    throw new ArgumentNullException(argumentName)
  }
}

export const notEmpty = <T>(argument: T[], argumentName: string) => {
  if (!argument || !argument.length) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-empty array.`)
  }
}

export const positive = (value: number, argumentName: string) => {
  if (value <= 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`)
  }
}

export const nonNegative = (value: number, argumentName: string) => {
  if (value < 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non-negative.`)
  }
}
