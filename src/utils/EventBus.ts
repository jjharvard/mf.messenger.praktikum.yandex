import {Component} from "../abstract/Component.js";
import {EventsListener} from "../abstract/EventsListener.js";

export class EventBus {

    private static instance: EventBus;

    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    listeners: { [k: string]: EventsListener[] } = {};

    emit(event: EVENT, payload: Payload = {}) {
        for (let listener of this.listeners[event]) {
            if (listener[event]) {
                listener[event](payload);
            }
        }
    }

    register(event: EVENT, view: Component) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(view);
    }

    unregister(event: EVENT, view: Component) {
        let index = this.listeners[event].indexOf(view);
        if (index !== -1) {
            this.listeners[event].splice(index, 1);
        }
    }

    unregisterAll(event: EVENT) {
        delete this.listeners[event];
    }

}