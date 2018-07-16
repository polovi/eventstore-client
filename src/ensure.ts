export class ArgumentNullException extends Error {
  constructor(argumentName?: string, msg?: string) {
    super(`${msg || 'Value cannot be null.'}${argumentName ? ` Parameter name: ${argumentName}` : ''}`)
  }
}

export class ArgumentOutOfRangeException extends Error {
  constructor(argumentName?: string, msg?: string) {
    super(
      `${msg || 'Specified argument was out of the range of valid values.'}${
        argumentName ? ` Parameter name: ${argumentName}` : ''
      }`
    )
  }
}

export const notNullOrEmpty = (value: string, argumentName: string) => {
  if (!value) {
    throw new ArgumentNullException(argumentName)
  }
}

export const notEmpty = (value: any[], argumentName: string) => {
  if (!value || !Array.isArray(value) || !value.length) {
    throw new ArgumentOutOfRangeException(argumentName, `${argumentName}  should be non-empty array.`)
  }
}
