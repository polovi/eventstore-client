import { WriteEventsCompleted, ReadStreamEventsCompleted, WriteResult, ReadStreamResult } from './messages'
import { SliceReadStatus } from './results'
import { WrongExpectedVersionError, ServerError } from './errors'

export const makeWriteEventsHandler = (stream: string, expectedVersion: number) => (response: WriteEventsCompleted) => {
  switch (response.result) {
    case WriteResult.Success:
      return { nextExpectedVersion: response.lastEventVersion }
    case WriteResult.WrongExpectedVersion:
      const err = `Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${
        response.currentVersion
      }`
      throw new WrongExpectedVersionError(err)
    default:
      throw new Error(`Unexpected ReadEventResult: ${response.result}`)
  }
}

export const makeReadStreamEventsHandler = (stream: string, fromEventVersion: number) => ({
  result,
  error,
  ...response
}: ReadStreamEventsCompleted) => {
  switch (result) {
    case ReadStreamResult.Success:
      return { ...response, status: SliceReadStatus.Success }
    case ReadStreamResult.NoStream:
      return { ...response, status: SliceReadStatus.NoStream }
    case ReadStreamResult.Error:
      throw new ServerError(error || '<no message>')
    default:
      throw Error(`Unexpected ReadStreamResult: ${result}`)
  }
}
