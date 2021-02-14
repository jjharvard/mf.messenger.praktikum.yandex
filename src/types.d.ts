type FlatKeys = { [k: string]: string }

type ArrayKeys = { [k: string]: string[] }

type Keys = { [k: string]: unknown }

type EVENT = 'onChatSelected' | 'onMessage' | 'onViewCreated'

type Payload = { [k: string]: number | string | [] | {} }
