import {ComponentGroup} from '../../content/ComponentGroup';

export class ErrorComponent extends ComponentGroup {
    constructor(private errorNumber: string, private errorMessage: string) {
        super();
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="error-container">
                    <div class="error">
                        <h1 class="error__title">${this.errorNumber}</h1>
                        <p class="error__message">${this.errorMessage}</p>
                        <button class="error__ref">Back to chats</button>
                    </div>
                </div>`;
    }
}
