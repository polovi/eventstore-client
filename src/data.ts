export interface Event<T extends object> {
  eventType: string
  data: T
  metadata?: object
}

export interface ResolvedEvent<T extends object> extends Event<T> {
  eventId: string
  eventVersion: number
}

export enum ExpectedVersion {
  Any = -2,
  NoStream = -1,
}

export enum ReadStreamResult {
  Success = 0,
  NoStream = 1,
  Error = 4,
}

export interface ReadStreamResponse {
  result: ReadStreamResult
  stream: string
  events: Event<any>[]
  fromEventVersion: number
  nextEventVersion: number
  lastEventVersion: number
  isEndOfStream: boolean
  error?: string
}

export enum SliceReadStatus {
  Success = 0,
  NoStream = 1,
  Error = 3,
}

export interface StreamEventsSlice {
  status: SliceReadStatus
  stream: string
  events: Event<any>[]
  fromEventVersion: number
  nextEventVersion: number
  lastEventVersion: number
  isEndOfStream: boolean
}

export interface WriteResult {
  lastEventVersion: number
}
