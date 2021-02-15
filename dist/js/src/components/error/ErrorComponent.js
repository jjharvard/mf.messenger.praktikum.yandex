import { ComponentGroup } from "../../_std/ComponentGroup.js";
export class ErrorComponent extends ComponentGroup {
    constructor(errorNumber, errorMessage) {
        super();
        this.errorNumber = errorNumber;
        this.errorMessage = errorMessage;
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<div class="error-container">
                    <div class="error">
                        <h1 class="error__title">${this.errorNumber}</h1>
                        <p class="error__message">${this.errorMessage}</p>
                        <button class="error__ref">Back to chats</button>
                    </div>
                </div>`;
    }
}
//# sourceMappingURL=ErrorComponent.js.map