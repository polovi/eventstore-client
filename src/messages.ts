import { EventRecord } from './event'

export enum OperationResult {
  Success = 0,
  WrongExpectedVersion = 1,
}

export interface WriteEventsCompleted {
  result: OperationResult
  lastEventNumber: number
  commitPosition?: number
  currentVersion?: number
  error?: string
}

export enum ReadEventResult {
  Success = 1,
  NotFound = 1,
  NoStream = 2,
  Error = 3,
}

export interface ReadEventCompleted {
  result: ReadEventResult
  stream: string
  event: EventRecord
  error?: string
}

export enum ReadStreamResult {
  Success = 0,
  NoStream = 1,
  Error = 2,
}

export interface ReadStreamEventsCompleted {
  result: ReadStreamResult
  stream: string
  events: EventRecord[]
  fromEventNumber: number
  nextEventNumber: number
  lastEventNumber: number
  isEndOfStream: boolean
  error?: string
}
