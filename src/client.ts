import { Lambda } from 'aws-sdk'
import { WriteResult, EventReadResult, StreamEventsReadResult } from './results'
import { Event } from './events'

const lambda = new Lambda()

export enum ExpectedVersion {
  ANY = -1,
  NO_STREAM = 0,
}

export class ClientError extends Error {}
export class NoStreamError extends Error {}
export class WrongExpectedVersionError extends Error {}

const invoke = async (functionName: string, data: any): Promise<any> =>
  lambda
    .invoke({ FunctionName: functionName, Payload: JSON.stringify(data) })
    .promise()
    .then(res => {
      const payload = JSON.parse(data.Payload as any)
      if (data.FunctionError) {
        throw new Error(payload.errorMessage || '')
      }
      return payload
    })

const mapErrorClass = error => {
  switch (Number(error.code)) {
    case 404:
      return new NoStreamError(error.message)
    case 409:
      return new WrongExpectedVersionError(error.message)
    default:
      return new ClientError(error.message)
  }
}

const sendCommand = async (endpoint: string, cmd: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { error, ...data } = await invoke(endpoint, cmd)

      return error ? reject(mapErrorClass(error)) : resolve(data)
    } catch (error) {
      reject(new ClientError(error.message))
    }
  })
}

export const createClient = (endpoint: string) => ({
  readEvent: async (stream: string, eventVersion: number): Promise<EventReadResult> => {
    const { event } = await sendCommand(endpoint, {
      action: 'readEvent',
      data: { stream, eventVersion },
    })

    return EventReadResult(stream, eventVersion, event)
  },

  readStreamEvents: async (stream: string, start?: number): Promise<StreamEventsReadResult> => {
    const { fromEventVersion, lastEventVersion, events } = await sendCommand(endpoint, {
      action: 'readStreamEvents',
      data: { stream, start },
    })

    return StreamEventsReadResult(stream, Number(fromEventVersion), Number(lastEventVersion), events)
  },

  appendToStream: async (stream: string, expectedVersion: number, events: Event<any>[]): Promise<WriteResult> => {
    const { nextExpectedVersion } = await sendCommand(endpoint, {
      action: 'appendToStream',
      data: { stream, expectedVersion, events },
    })

    return WriteResult(nextExpectedVersion)
  },
})
