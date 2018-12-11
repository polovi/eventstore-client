import { PersistentSubscriptionCreateStatus, ReadDirection } from './data'
import { ServerError, WrongExpectedVersionError } from './errors'
import * as ClientMessages from './messages'
import { EventReadResult, EventReadStatus, PersistentSubscriptionCreateResult, SliceReadStatus, StreamEventsSlice, WriteResult } from './results'

export const makeWriteEventsHandler = (stream: string, expectedVersion: number) => (response: ClientMessages.WriteEventsCompleted): WriteResult => {
  switch (response.result) {
    case ClientMessages.OperationResult.Success:
      return { nextExpectedVersion: response.lastEventNumber }
    case ClientMessages.OperationResult.WrongExpectedVersion:
      throw new WrongExpectedVersionError(
        `Append failed due to WrongExpectedVersion. Stream: ${stream}, Expected version: ${expectedVersion}, Current version: ${response.currentVersion}`
      )
    default:
      throw new Error(`Unexpected OperationResult: ${response.result}`)
  }
}

export const makeReadEventHandler = (eventNumber: number) => ({ result, error, ...response }: ClientMessages.ReadEventCompleted): EventReadResult => {
  switch (result) {
    case ClientMessages.ReadEventResult.Success:
      return { ...response, eventNumber, status: EventReadStatus.Success }
    case ClientMessages.ReadEventResult.NoStream:
      return { ...response, eventNumber, status: EventReadStatus.NoStream }
    case ClientMessages.ReadEventResult.NotFound:
      return { ...response, eventNumber, status: EventReadStatus.NotFound }
    case ClientMessages.ReadEventResult.Error:
      throw new ServerError(error || '<no message>')
    default:
      throw new Error(`Unexpected ReadEventResult: ${result}`)
  }
}

export const makeReadStremEventsHandler = (direction: ReadDirection) => ({ result, error, ...response }: ClientMessages.ReadStreamEventsCompleted): StreamEventsSlice => {
  switch (result) {
    case ClientMessages.ReadStreamResult.Success:
      return { ...response, status: SliceReadStatus.Success, readDirection: direction }
    case ClientMessages.ReadStreamResult.NoStream:
      return { ...response, status: SliceReadStatus.NoStream, readDirection: direction }
    case ClientMessages.ReadStreamResult.Error:
      throw new ServerError(error || '<no message>')
    default:
      throw new Error(`Unexpected ReadStreamResult: ${result}`)
  }
}

export const makeCreatePersistantSubscriptionHandler = stream => (result: ClientMessages.CreatePersistentSubscriptionCompleted): PersistentSubscriptionCreateResult => {
  console.log('CreatePersistentSubscriptionCompleted', JSON.stringify(result, null, 2))
  return {
    status: PersistentSubscriptionCreateStatus.Success,
  }
}
