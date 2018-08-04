import * as Ensure from './utils/ensure'
import { ArgumentOutOfRangeException } from './errors'
import { sendMessage } from './transport'
import { InvocationCommand, ReadDirection, EventData } from './data'
import { WriteResult, EventReadResult, StreamEventsSlice } from './results'
import * as ClientMessage from './messages'
import { makeWriteEventsHandler, makeReadEventHandler, makeReadStremEventsHandler } from './handlers'

export interface IEventStoreConnection {
  appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>
  readEvent(stream: string, eventNumber: number): Promise<EventReadResult>
  readStreamEventsForward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>
  readStreamEventsBackward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>
  readAllEventsForward(position: any, count?: number)
  readAllEventsBackward(position: any, count?: number)
}

export const createConnection = (endpoint: string): IEventStoreConnection => ({
  appendToStream: async (stream, expectedVersion, events) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.notEmpty(events, 'events')

    const handler = makeWriteEventsHandler(stream, expectedVersion)

    return sendMessage<WriteResult, ClientMessage.WriteEventsCompleted>(endpoint, handler, {
      command: InvocationCommand.WriteEvents,
      data: { stream, expectedVersion, events },
    })
  },

  readEvent: async (stream, eventNumber) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    if (eventNumber < -1) throw new ArgumentOutOfRangeException('eventNumber')

    const handler = makeReadEventHandler(eventNumber)

    return sendMessage<EventReadResult, ClientMessage.ReadEventCompleted>(endpoint, handler, {
      command: InvocationCommand.ReadEvent,
      data: { stream, eventNumber },
    })
  },

  readStreamEventsForward: async (stream, start, count?) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.nonNegative(start, 'start')
    count && Ensure.positive(count, 'count')

    const handler = makeReadStremEventsHandler(ReadDirection.Forward)

    return sendMessage<StreamEventsSlice, ClientMessage.ReadStreamEventsCompleted>(endpoint, handler, {
      command: InvocationCommand.ReadStreamEventsForward,
      data: { stream, start, count },
    })
  },

  readStreamEventsBackward: async (stream, start, count?) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    count && Ensure.positive(count, 'count')

    const handler = makeReadStremEventsHandler(ReadDirection.Backward)

    return sendMessage<StreamEventsSlice, ClientMessage.ReadStreamEventsCompleted>(endpoint, handler, {
      command: InvocationCommand.ReadStreamEventsBackward,
      data: { stream, start, count },
    })
  },

  readAllEventsForward: (position, count?) => {
    throw new Error('Not implemented')
  },

  readAllEventsBackward: (position, count?) => {
    throw new Error('Not implemented')
  },
})
