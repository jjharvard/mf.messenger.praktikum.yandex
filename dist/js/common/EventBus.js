export class EventBus {
    constructor() {
        this.listeners = {};
    }
    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    emit(event, payload = {}) {
        for (let listener of this.listeners[event]) {
            if (typeof listener[event] === 'function') {
                listener[event](payload);
            }
        }
    }
    register(event, view) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(view);
    }
    unregister(event, view) {
        let index = this.listeners[event].indexOf(view);
        if (index != -1) {
            this.listeners[event].splice(index, 1);
        }
    }
    unregisterAll(event) {
        delete this.listeners[event];
    }
}
