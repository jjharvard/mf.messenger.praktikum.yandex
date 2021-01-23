import {View} from "../../abstract/View";

export class SubmitButton extends View {

    constructor(private locationHRef: string, private name: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'hello': 'World'
        };
    }

    getTemplate(): string {
        return `<button onclick="location.href=${this.locationHRef}" hello="{{hello}}" class="auth__btn_main">${this.name}</button>`;
    }

}