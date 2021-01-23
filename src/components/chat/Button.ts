import {View} from "../../abstract/View";

export class Button extends View {

    getTemplate(): string {
        return `
                    <button id="btnId" class="input__send"></button>
               `;
    }

    getKeys(): Keys {
        return {
        }
    }
}