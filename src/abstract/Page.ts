import {Component} from "./Component";
import {EventBus} from "../utils/EventBus";

export class Page {

    view: Component

    constructor(view: Component) {
        this.view = view;
    }

    mount() {
        let root = document.getElementById('root');
        let inner = this.view.render(this.view);
        console.log(inner)
        root!.innerHTML = inner;
        window.onload = function () {
            EventBus.getInstance().emit('onViewCreated')
        }
    }

}