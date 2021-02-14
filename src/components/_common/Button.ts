import {Component} from "../../abstract/Component.js";

export class Button extends Component {

    constructor(private name: string, private clazz: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'name': this.name,
            'clazz': this.clazz
        };
    }

    getTemplate(): string {
        return `<button class={{clazz}}>{{name}}</button>`;
    }

}