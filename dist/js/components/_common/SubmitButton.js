import { View } from "../../abstract/View";
export class SubmitButton extends View {
    constructor(locationHRef, name, clazz) {
        super();
        this.locationHRef = locationHRef;
        this.name = name;
        this.clazz = clazz;
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<button onclick="location.href=${this.locationHRef}" class=${this.clazz}>${this.name}</button>`;
    }
}
