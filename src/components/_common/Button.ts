import {Component} from "../../abstract/Component.js";

export class Button extends Component {

    constructor(private locationHRef: string, private name: string, private clazz: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'name': this.name,
            'location': this.locationHRef,
            'clazz': this.clazz
        };
    }

    getTemplate(): string {
        return `<button onclick="location.href={{location}}" class={{clazz}}>{{name}}</button>`;
    }

}