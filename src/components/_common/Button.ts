import {Component} from "../../abstract/Component";

export class Button extends Component {

    constructor(private locationHRef: string, private name: string, private clazz: string) {
        super();
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<button onclick="location.href=${this.locationHRef}" class=${this.clazz}>${this.name}</button>`;
    }

}