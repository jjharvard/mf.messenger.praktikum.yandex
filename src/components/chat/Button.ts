import {View} from "../../abstract/View";
import {EventBus} from "../../common/EventBus";

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