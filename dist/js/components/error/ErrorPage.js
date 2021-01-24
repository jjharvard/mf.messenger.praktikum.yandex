import { ViewGroup } from "../../abstract/ViewGroup";
export class ErrorPage extends ViewGroup {
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
