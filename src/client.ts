import { Lambda } from 'aws-sdk'
import * as Ensure from './ensure'
import { readStreamEventsResponseHandler, appendToStreamResponseHandler } from './responseHandlers'
import { Event, StreamEventsSlice, WriteResult } from './data'

const lambda = new Lambda()

export interface IEventStoreClient {
  readStreamEventsForward(stream: string, start: number): Promise<StreamEventsSlice>
  appendToStream(stream: string, expectedVersion: number, events: Event[]): Promise<WriteResult>
}

const invoke = async (functionName: string, data: any): Promise<any> =>
  lambda
    .invoke({ FunctionName: functionName, Payload: JSON.stringify(data) })
    .promise()
    .then(data => {
      const payload = JSON.parse(data.Payload as string)
      if (data.FunctionError) {
        throw new Error(payload.errorMessage || '')
      }
      return payload
    })

export const sendCommand = async (endpoint: string, command: string, data: any, handler: any) =>
  invoke(endpoint, { command, data }).then(handler)

export const createClient = (endpoint: string): IEventStoreClient => ({
  readStreamEventsForward: async (stream: string, start: number = 0) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    return sendCommand(endpoint, 'readStreamEventsForward', { stream, start }, readStreamEventsResponseHandler)
  },

  appendToStream: async (stream: string, expectedVersion: number, events: Event[]) => {
    Ensure.notNullOrEmpty(stream, 'stream')
    return sendCommand(endpoint, 'appendToStream', { stream, expectedVersion, events }, appendToStreamResponseHandler)
  },
})
