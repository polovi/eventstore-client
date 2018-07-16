import { Lambda } from 'aws-sdk'

const lambda = new Lambda()

export enum InvokeCommand {
  WriteEvents = 'writeEvents',
  ReadStreamEventsForward = 'readStreamEventsForward',
  ReadStreamEventsBackward = 'readStreamEventsBackward',
}

export const sendCommand = async <TResult>(endpoint: string, handler, command): Promise<TResult> => {
  const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(command) }).promise()
  const payload = JSON.parse(data.Payload as string)

  if (data.FunctionError) {
    throw Error(payload.errorMessage || '')
  }

  return handler(payload)
}
