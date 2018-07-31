import { WrongExpectedVersionError, ServerError } from './errors'
import {
  WriteEventsCompleted,
  OperationResult,
  ReadEventCompleted,
  ReadEventResult,
  ReadStreamEventsCompleted,
  ReadStreamResult,
} from './messages'
import { EventReadStatus, SliceReadStatus, ReadDirection } from './results'

export const makeWriteEventsHandler = (stream: string, expectedVersion: number) => (response: WriteEventsCompleted) => {
  switch (response.result) {
    case OperationResult.Success:
      return { nextExpectedVersion: response.lastEventNumber }
    case OperationResult.WrongExpectedVersion:
      throw new WrongExpectedVersionError(
        `Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${
          response.currentVersion
        }`
      )
    default:
      throw new Error(`Unexpected OperationResult: ${response.result}`)
  }
}

export const makeReadEventHandler = (eventNumber: number) => ({ result, error, ...response }: ReadEventCompleted) => {
  switch (result) {
    case ReadEventResult.Success:
      return { ...response, eventNumber, status: EventReadStatus.Success }
    case ReadEventResult.NoStream:
      return { ...response, eventNumber, status: EventReadStatus.NoStream }
    case ReadEventResult.NotFound:
      return { ...response, eventNumber, status: EventReadStatus.NotFound }
    case ReadEventResult.Error:
      throw new ServerError(error || '<no message>')
    default:
      throw new Error(`Unexpected ReadEventResult: ${result}`)
  }
}

const handleReadStremEventsResponse = ({ result, error, ...response }: ReadStreamEventsCompleted) => {
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

export const readStreamEventsForwardHandler = (response: ReadStreamEventsCompleted) => {
  return {
    ...handleReadStremEventsResponse(response),
    readDirection: ReadDirection.Forward,
  }
}

export const readStreamEventsBackwarddHandler = (response: ReadStreamEventsCompleted) => {
  return {
    ...handleReadStremEventsResponse(response),
    readDirection: ReadDirection.Backward,
  }
}
