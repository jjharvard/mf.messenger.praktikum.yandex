import { Component } from "../../content/Component";
export class Button extends Component {
    constructor(name, clazz) {
        super();
        this.name = name;
        this.clazz = clazz;
    }
    getKeys() {
        return {
            'name': this.name,
            'clazz': this.clazz
        };
    }
    getTemplate() {
        return `<button class={{clazz}}>{{name}}</button>`;
    }
}
//# sourceMappingURL=Button.js.map