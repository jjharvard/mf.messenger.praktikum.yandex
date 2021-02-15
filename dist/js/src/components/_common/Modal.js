import { Button } from "./Button.js";
import { ComponentGroup } from "../../_std/ComponentGroup.js";
import { UploadFileInput } from "./UploadFileInput.js";
import { ValidatableInput } from "./ValidatableInput.js";
export class ModalBuilder {
    constructor() {
        this.buttonName = "";
        this.title = "";
        this.inputName = "";
        this.inputClass = "";
        this.inputPlaceholder = "";
        this.inputType = "";
        this.uploadLabel = "";
        this.validationClassPrefix = "";
        this.showUpload = false;
        this.showInput = false;
    }
    withTitle(title) {
        this.title = title;
        return this;
    }
    withButton(name) {
        this.buttonName = name;
        return this;
    }
    withUpload(label) {
        this.showUpload = true;
        this.uploadLabel = label;
        return this;
    }
    withInput(validationClassPrefix, name, clazz, placeholder, type) {
        this.showInput = true;
        this.validationClassPrefix = validationClassPrefix;
        this.inputName = name;
        this.inputClass = clazz;
        this.inputPlaceholder = placeholder;
        this.inputType = type;
        return this;
    }
    build() {
        let modal = new Modal(this.title, this.buttonName, this.inputName, this.inputClass, this.inputPlaceholder, this.inputType, this.uploadLabel, this.validationClassPrefix);
        modal.showInput = this.showInput;
        modal.showUpload = this.showUpload;
        return modal;
    }
}
export class Modal extends ComponentGroup {
    constructor(title, buttonName, inputName, inputClass, inputPlaceholder, inputType, uploadLabel, validationClassPrefix) {
        super([
            new UploadFileInput(uploadLabel),
            new ValidatableInput(validationClassPrefix, inputName, inputClass, inputPlaceholder, inputType, ""),
            new Button(buttonName, "common-modal__btn_submit")
        ]);
        this.title = title;
        this.showUpload = false;
        this.showInput = false;
    }
    getKeys() {
        return {
            "title": this.title
        };
    }
    show() {
        this.getDOMView().style.display = 'flex';
    }
    hide() {
        this.getDOMView().style.display = 'none';
    }
    clear() {
        this.textInput.getInput().value = '';
    }
    onViewCreated() {
        this.btnSubmit = this.getDOMView().querySelector(".common-modal__btn_submit");
        this.uploadFileInput = this.getChildComponentsByName('UploadFileInput')[0];
        this.uploadFileInput.getDOMView().style.display = this.showUpload ? 'flex' : 'none';
        this.textInput = this.getChildComponentsByName('ValidatableInput')[0];
        this.textInput.getDOMView().style.display = this.showInput ? 'flex' : 'none';
        window.addEventListener('click', (event) => {
            if (event.target === this.getDOMView()) {
                this.hide();
            }
        });
        this.btnSubmit.onclick = () => {
            let files = this.uploadFileInput.fileInput.files;
            let value = this.textInput.getInput().value;
            if (this.onChangedCallback) {
                this.onChangedCallback(files, value);
            }
        };
    }
    getTemplate() {
        return `
            <div class="common-modal">
                <div class="common-modal__content">
                    <p class="common-modal__title">{{title}}</p>
                    {{UploadFileInput}}
                    {{ValidatableInput}}
                    {{Button}}
                </div>
            </div>
            `;
    }
}
//# sourceMappingURL=Modal.js.map