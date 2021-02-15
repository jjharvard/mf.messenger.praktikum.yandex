import { Component } from "../../content/Component.js";
export class ArrowButton extends Component {
    constructor(name, clazz) {
        super();
        this.name = name;
        this.clazz = clazz;
    }
    getKeys() {
        return {
            'ButtonName': this.name,
            'ClassName': this.clazz
        };
    }
    getTemplate() {
        return `<button class="{{ClassName}}">
                    {{ButtonName}}
                    <i class="arrow"></i>
                </button>`;
    }
}
//# sourceMappingURL=ArrowButton.js.map