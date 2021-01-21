import {View} from "../widgets/View";
import {EventsListener} from "./EventsListener";

export class EventBus {

    private static instance: EventBus;

    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    listeners: { [k: string]: EventsListener[] } = {};

    emit(event: string, payload = {}) {
        // for (let listener of this.listeners[event]) {
        //     if (typeof listener[event] === 'function') {
        //         listener[event](payload)
        //     }
        // }
    }

    register(event: string, view: View) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(view);
    }

    unregister(event: string, view: View) {
        let index = this.listeners[event].indexOf(view);
        if (index != -1) {
            this.listeners[event].splice(index, 1);
        }
    }

    unregisterAll(event: string) {
        delete this.listeners[event];
    }

}