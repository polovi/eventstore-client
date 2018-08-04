//prettier-ignore
export enum InvocationCommand {
  // Ping = 0x03,

  WriteEvents = 0x82,

  // DeleteStream = 0x8A,

  ReadEvent = 0xB0,
  ReadStreamEventsForward = 0xB2,
  ReadStreamEventsBackward = 0xB4,
  ReadAllEventsForward = 0xB6,
  ReadAllEventsBackward = 0xB8,

  CreatePersistentSubscription = 0xC8,
  DeletePersistentSubscription = 0xCA,
}

export enum ExpectedVersion {
  Any = -2,
  NoStream = -1,
}

export enum ReadDirection {
  Forward = 'Forward',
  Backward = 'Backward',
}

export interface EventData {
  eventType: string
  data: object
  metadata?: object
}

export interface EventRecord extends EventData {
  eventId: string
  eventNumber: number
}
