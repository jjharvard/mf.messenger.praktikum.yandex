import {Component} from "./Component.js";
import {EventBus} from "../utils/EventBus.js";

export class Page {

    view: Component;

    constructor(view: Component) {
        this.view = view;
    }

    mount() {
        let root = document.getElementById('root');
        let inner = this.view.render(this.view);
        root!.innerHTML = inner;
        window.onload = function () {
            EventBus.getInstance().emit('onViewCreated');
        };
    }

}