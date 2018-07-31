import { Lambda } from 'aws-sdk'

const lambda = new Lambda()

export enum InvocationCommand {
  WriteEvents = 130, //0x82

  ReadEvent = 176, //0xB0
  ReadStreamEventsForward = 178, //0xB2
  ReadStreamEventsBackward = 180, //0xB4
}

export const sendCommand = async <TResult>(endpoint: string, handler, command): Promise<TResult> => {
  const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(command) }).promise()
  const payload = JSON.parse(data.Payload as string)

  if (data.FunctionError) {
    throw Error(payload.errorMessage || '')
  }

  return handler(payload)
}
