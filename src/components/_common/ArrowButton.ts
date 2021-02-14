import {Component} from "../../abstract/Component.js";

export class ArrowButton extends Component {

    constructor(private name: string, private clazz: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'ButtonName': this.name,
            'ClassName': this.clazz
        };
    }

    getTemplate(): string {
        return `<button class="{{ClassName}}">
                    {{ButtonName}}
                    <i class="arrow"></i>
                </button>`;
    }
}