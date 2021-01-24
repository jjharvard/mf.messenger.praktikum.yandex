export class EventsListener {
    onMessage(payload: Payload = {}): void {
        if (!payload) {
            console.log(payload);
        }
    }

    onViewCreated(payload: Payload = {}): void {
        if (!payload) {
            console.log(payload);
        }
    }
}