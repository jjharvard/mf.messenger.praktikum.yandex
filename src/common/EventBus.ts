import {View} from "../abstract/View";

export class EventBus {

    private static instance: EventBus;

    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    listeners: { [k: string]: View[] } = {};

    emit(event: EVENT, payload: Payload = {}) {
        for (let listener of this.listeners[event]) {
            if(listener[event]) {
                listener[event](payload)
            }
        }
    }

    register(event: EVENT, view: View) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(view);
    }

    unregister(event: EVENT, view: View) {
        let index = this.listeners[event].indexOf(view);
        if (index != -1) {
            this.listeners[event].splice(index, 1);
        }
    }

    unregisterAll(event: EVENT) {
        delete this.listeners[event];
    }

}