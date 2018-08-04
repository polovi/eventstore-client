import { ReadDirection, EventData } from './data'

export interface WriteResult {
  nextExpectedVersion: number
}

export enum EventReadStatus {
  Success = 1,
  NotFound = 2,
  NoStream = 3,
}

export interface EventReadResult {
  status: EventReadStatus
  stream: string
  eventNumber: number
  event?: EventData
}

export enum SliceReadStatus {
  Success = 1,
  NoStream = 2,
}

export interface StreamEventsSlice {
  status: SliceReadStatus
  stream: string
  readDirection: ReadDirection
  events: EventData[]
  fromEventNumber: number
  nextEventNumber: number
  lastEventNumber: number
  isEndOfStream: boolean
}
