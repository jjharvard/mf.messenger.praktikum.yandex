
type Props = { [prop: string]: string }

type Props2 = {[prop: string]: unknown}

type EVENT = 'onMessage' | 'onViewCreated'

type Payload = {[k: string]: number | string | [] | {}}

type Constructor<T = {}> = new (...args: any[]) => T;