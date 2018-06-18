export class ArgumentNullException extends Error {
  constructor(argumentName?: string, msg?: string) {
    super(`${msg || 'Value cannot be null.'}${argumentName ? ` Parameter name: ${argumentName}` : ''}`)
  }
}

export class ArgumentOutOfRangeException extends Error {
  constructor(argumentName?: string, msg?: string) {
    super(`${msg || 'Specified argument was out of the range of valid values.'}${argumentName ? ` Parameter name: ${argumentName}` : ''}`)
  }
}

export const notNull = <T>(value: T, argumentName: string) => {
  if (value === null) {
    throw new ArgumentNullException(argumentName)
  }
}

export const notNullOrEmpty = (value: string, argumentName: string) => {
  if (!value) {
    throw new ArgumentNullException(argumentName)
  }
}

export const positive = (value: number, argumentName: string) => {
  if (value <= 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be positive.`)
  }
}

export const nonNegative = (value: number, argumentName: string) => {
  if (value < 0) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName} should be non negative.`)
  }
}
