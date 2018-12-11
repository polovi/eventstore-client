import { EventData, InvocationCommand, PersistentSubscriptionSettings, ReadDirection } from './data'
import { ArgumentOutOfRangeException } from './errors'
import { makeCreatePersistantSubscriptionHandler, makeReadEventHandler, makeReadStremEventsHandler, makeWriteEventsHandler } from './handlers'
import * as ClientMessage from './messages'
import { EventReadResult, PersistentSubscriptionCreateResult, StreamEventsSlice, WriteResult } from './results'
import { sendMessage } from './transport'
import * as Ensure from './utils/Ensure'

export interface IEventStoreConnection {
  appendToStream(stream: string, expectedVersion: number, events: EventData[]): Promise<WriteResult>
  readEvent(stream: string, eventNumber: number): Promise<EventReadResult>
  readStreamEventsForward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>
  readStreamEventsBackward(stream: string, start: number, count?: number): Promise<StreamEventsSlice>
  readAllEventsForward(position: any, count?: number)
  readAllEventsBackward(position: any, count?: number)
  createPersistantSubscription(stream: string, settings: PersistentSubscriptionSettings): Promise<PersistentSubscriptionCreateResult>
}

export const createConnection = (endpoint: string): IEventStoreConnection => ({
  appendToStream: async (stream, expectedVersion, events) => {
    Ensure.notNull(stream, 'stream')
    Ensure.notEmpty(events, 'events')

    const handler = makeWriteEventsHandler(stream, expectedVersion)

    return sendMessage<WriteResult, ClientMessage.WriteEventsCompleted>(endpoint, handler, {
      command: InvocationCommand.WriteEvents,
      data: { stream, expectedVersion, events },
    })
  },

  readEvent: async (stream, eventNumber) => {
    Ensure.notNull(stream, 'stream')
    if (eventNumber < -1) throw new ArgumentOutOfRangeException('eventNumber')

    const handler = makeReadEventHandler(eventNumber)

    return sendMessage<EventReadResult, ClientMessage.ReadEventCompleted>(endpoint, handler, {
      command: InvocationCommand.ReadEvent,
      data: { stream, eventNumber },
    })
  },

  readStreamEventsForward: async (stream, start, count?) => {
    Ensure.notNull(stream, 'stream')
    Ensure.nonNegative(start, 'start')
    count && Ensure.positive(count, 'count')

    const handler = makeReadStremEventsHandler(ReadDirection.Forward)

    return sendMessage<StreamEventsSlice, ClientMessage.ReadStreamEventsCompleted>(endpoint, handler, {
      command: InvocationCommand.ReadStreamEventsForward,
      data: { stream, start, count },
    })
  },

  readStreamEventsBackward: async (stream, start, count?) => {
    Ensure.notNull(stream, 'stream')
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

  createPersistantSubscription: (stream, settings) => {
    Ensure.notNull(stream, 'stream')
    Ensure.notNull(settings, 'settings')

    const handler = makeCreatePersistantSubscriptionHandler(stream)

    return sendMessage<PersistentSubscriptionCreateResult, ClientMessage.CreatePersistentSubscriptionCompleted>(endpoint, handler, {
      command: InvocationCommand.CreatePersistentSubscription,
      data: { stream, settings },
    })
  },
})
