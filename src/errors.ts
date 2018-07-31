export class WrongExpectedVersionError extends Error {}

export class ServerError extends Error {}

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
