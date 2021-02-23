type FlatKeys = { [k: string]: string }

type ArrayKeys = { [k: string]: string[] }

type Keys = { [k: string]: unknown }

type EVENT = 'onChatSelected' | 'onChatRefresh' | 'onViewCreated' | 'onChatAction'

type CHAT_ACTION = 'userRemove' | 'userAdd' | 'chatRemove'

type Payload = { [k: string]: CHAT_ACTION | number | string | [] | {} }
