import * as Ensure from './ensure'
import { sendCommand, InvokeCommand } from './service'
import { makeWriteEventsHandler, makeReadStreamEventsHandler } from './handlers'
import { StreamEventsSlice, WriteResult } from './results'
import { EventData } from './events'

export interface IEventStoreClient {
  readStreamEventsForward(stream: string, start: number): Promise<StreamEventsSlice>
  appendToStream?(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>
}

export const makeClient = (endpoint: string): IEventStoreClient => ({
  appendToStream: async (stream, expectedVersion, events) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    Ensure.notEmpty(events, 'events')

    const handler = makeWriteEventsHandler(stream, expectedVersion)

    return sendCommand<WriteResult>(endpoint, handler, {
      command: InvokeCommand.WriteEvents,
      data: { stream, expectedVersion, events },
    })
  },

  readStreamEventsForward: async (stream, start) => {
    Ensure.notNullOrEmpty(stream, 'stream')

    const handler = makeReadStreamEventsHandler(stream, start)

    return sendCommand<StreamEventsSlice>(endpoint, handler, {
      command: InvokeCommand.ReadStreamEventsForward,
      data: { stream, start },
    })
  },
})
