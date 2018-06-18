import { ReadStreamResult, StreamEventsSlice, SliceReadStatus } from './data'

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
