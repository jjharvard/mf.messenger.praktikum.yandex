import {Component} from "./Component.js";
import {EventBus} from "../utils/EventBus.js";

export class Page {

    view: Component;
    root: HTMLElement;
    inner: string;

    constructor(view: Component) {
        this.view = view;
        this.root = document.getElementById('root')!;
    }

    hide() {
        this.root.innerHTML = "";
    }

    show() {
        if (!this.inner) {
            this.inner = this.view.render(this.view);
        }
        this.root.innerHTML = this.inner;
        EventBus.getInstance().emit('onViewCreated');
    }

}