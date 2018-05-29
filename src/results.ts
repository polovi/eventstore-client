import { ResolvedEvent } from './events'

export interface WriteResult {
  nextExpectedVersion: number
}
export const WriteResult = (nextExpectedVersion: number): WriteResult => ({
  nextExpectedVersion,
})

export interface EventReadResult {
  stream: string
  eventVersion: number
  event: ResolvedEvent<any>
}
export const EventReadResult = (stream: string, eventVersion: number, event: ResolvedEvent<any>): EventReadResult => ({
  stream,
  eventVersion,
  event,
})

export interface StreamEventsReadResult {
  stream: string
  fromEventVersion: number
  lastEventVersion: number
  events: ResolvedEvent<any>[]
}
export const StreamEventsReadResult = (
  stream: string,
  fromEventVersion: number,
  lastEventVersion: number,
  events: ResolvedEvent<any>[]
) => ({ stream, fromEventVersion, lastEventVersion, events })
