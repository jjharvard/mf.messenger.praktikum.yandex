import { View } from "../../abstract/View";
export class SubmitButton extends View {
    constructor(locationHRef, name) {
        super();
        this.locationHRef = locationHRef;
        this.name = name;
    }
    getKeys() {
        return {
            'hello': 'World'
        };
    }
    getTemplate() {
        return `<button onclick="location.href=${this.locationHRef}" hello="{{hello}}" class="auth__btn_main">${this.name}</button>`;
    }
}
