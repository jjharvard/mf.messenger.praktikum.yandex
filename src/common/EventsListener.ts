export interface EventsListener {
    onMessage(payload: {}) : void
    onViewCreated(payload: {}) : void
}