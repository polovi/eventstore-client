import * as Ensure from './ensure'
import { ArgumentOutOfRangeException } from './errors'
import { sendCommand, InvocationCommand } from './transport'
import { WriteResult, EventReadResult, StreamEventsSlice } from './results'
import {
  makeWriteEventsHandler,
  makeReadEventHandler,
  readStreamEventsForwardHandler,
  readStreamEventsBackwarddHandler,
} from './handlers'
import { EventData } from './event'

export interface IEventStoreClient {
  appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>
  readEvent(stream: string, eventNumber: number): Promise<any>
  readStreamEventsForward(stream: string, start: number, count: number): Promise<any>
  readStreamEventsBackward(stream: string, start: number, count: number): Promise<any>
}

export const makeClient = (endpoint: string): IEventStoreClient => ({
  appendToStream: async (stream, expectedVersion, events) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.notNullOrEmptyArray(events, 'events')

    return sendCommand<WriteResult>(endpoint, makeWriteEventsHandler(stream, expectedVersion), {
      command: InvocationCommand.WriteEvents,
      data: { stream, expectedVersion, events },
    })
  },

  readEvent: async (stream, eventNumber) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    if (eventNumber < -1) throw new ArgumentOutOfRangeException('eventNumber')

    return sendCommand<EventReadResult>(endpoint, makeReadEventHandler(eventNumber), {
      command: InvocationCommand.ReadEvent,
      data: { stream, eventNumber },
    })
  },

  readStreamEventsForward: async (stream, start, count) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.positive(start, 'start')
    Ensure.nonNegative(count, 'count')

    return sendCommand<StreamEventsSlice>(endpoint, readStreamEventsForwardHandler, {
      command: InvocationCommand.ReadStreamEventsForward,
      data: { stream, start, count },
    })
  },

  readStreamEventsBackward: async (stream, start, count) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.positive(count, 'count')

    return sendCommand<StreamEventsSlice>(endpoint, readStreamEventsBackwarddHandler, {
      command: InvocationCommand.ReadStreamEventsBackward,
      data: { stream, start, count },
    })
  },
})
