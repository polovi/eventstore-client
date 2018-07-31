import { ArgumentNullException, ArgumentOutOfRangeException } from './errors'

export const notNullOrEmpty = (value: string, argumentName: string) => {
  if (!value) {
    throw new ArgumentNullException(argumentName)
  }
}

export const notNullOrEmptyArray = (value: any[], argumentName: string) => {
  if (!value || !Array.isArray(value) || !value.length) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName}  should be non-empty array.`)
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
