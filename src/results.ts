import { EventRecord } from './event'

export interface WriteResult {
  nextExpectedVersion: number
}

export enum EventReadStatus {
  Success = 1,
  NotFound = 2,
  NoStream = 3,
}

export interface EventReadResult {
  result: EventReadStatus
  stream: string
  eventNumber: number
  event?: any // ResolvedEvent
}

export enum SliceReadStatus {
  Success = 1,
  NoStream = 2,
}

export enum ReadDirection {
  Forward = 'Forward',
  Backward = 'Backward',
}

export interface StreamEventsSlice {
  result: SliceReadStatus
  stream: string
  readDirection: string
  events: EventRecord[] // ResolvedEvent
  fromEventNumber: number
  nextEventNumber: number
  lastEventNumber: number
  isEndOfStream: boolean
}
