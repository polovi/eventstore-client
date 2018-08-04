import { Lambda } from 'aws-sdk'

const lambda = new Lambda()

export const sendMessage = async <TResult, TResponse>(endpoint: string, handler: (response: TResponse) => TResult, msg) => {
  const data = await lambda.invoke({ FunctionName: endpoint, Payload: JSON.stringify(msg) }).promise()
  const payload = JSON.parse(data.Payload as string)

  if (data.FunctionError) {
    throw Error(payload.errorMessage || '')
  }

  return handler(payload)
}
