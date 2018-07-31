export interface EventData {
  eventType: string
  data: object
  metadata?: object
}

export const EventData = (eventType: string, data: object, metadata?: object) => ({
  eventType,
  data,
  metadata,
})

export interface EventRecord extends EventData {
  eventId: string
  eventNumber: string
}
