import { ReadStreamResult, StreamEventsSlice, SliceReadStatus, WriteResult } from './data'

export const readStreamEventsResponseHandler = ({ result, error, ...response }): StreamEventsSlice => {
  const convert = result => {
    switch (result) {
      case ReadStreamResult.Success:
        return SliceReadStatus.Success
      case ReadStreamResult.NoStream:
        return SliceReadStatus.NoStream
      default:
        throw new Error(`Unexpected ReadEventResult: ${result}`)
    }
  }

  switch (result) {
    case ReadStreamResult.Success:
    case ReadStreamResult.NoStream:
      return {
        status: convert(result),
        stream: response.stream,
        events: response.events,
        fromEventVersion: response.fromEventVersion,
        nextEventVersion: response.nextEventVersion,
        lastEventVersion: response.lastEventVersion,
        isEndOfStream: response.isEndOfStream,
      } as StreamEventsSlice
    case ReadStreamResult.Error:
      throw new Error(error || '<no message>')
    default:
      throw new Error(`Unexpected ReadEventResult: ${result}`)
  }
}

export const appendToStreamResponseHandler = ({ result, error, ...response }): WriteResult => {
  switch (result) {
    case 0:
      return {
        lastEventVersion: response.lastEventVersion,
      } as WriteResult
    case 1:
      throw new Error(`Append failed due to WrongExpectedVersion. Stream: ${response.stream}, Expected version: {1}, Current version: {2}`)
    case 4:
      throw new Error(error || '<no message>')
    default:
      throw new Error(`Unexpected ReadEventResult: ${result}`)
  }
}
