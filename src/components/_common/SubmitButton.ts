import {View} from "../../abstract/View";

export class SubmitButton extends View {

    constructor(private locationHRef: string, private name: string, private clazz: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'hello': 'World'
        };
    }

    getTemplate(): string {
        return `<button onclick="location.href=${this.locationHRef}" hello="{{hello}}" class=${this.clazz}>${this.name}</button>`;
    }

}