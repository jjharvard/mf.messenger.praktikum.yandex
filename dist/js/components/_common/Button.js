import { Component } from "../../abstract/Component";
export class Button extends Component {
    constructor(locationHRef, name, clazz) {
        super();
        this.locationHRef = locationHRef;
        this.name = name;
        this.clazz = clazz;
    }
    getKeys() {
        return {
            'name': this.name,
            'location': this.locationHRef,
            'clazz': this.clazz
        };
    }
    getTemplate() {
        return `<button onclick="location.href={{location}}" class={{clazz}}>{{name}}</button>`;
    }
}
