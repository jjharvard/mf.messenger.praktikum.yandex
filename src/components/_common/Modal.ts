import {Button} from "./Button.js";
import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {UploadFileInput} from "./UploadFileInput.js";
import {ValidatableInput} from "./ValidatableInput.js";

export class ModalBuilder {
    private buttonName: string = "";
    private title: string = "";
    private inputName: string = "";
    private inputClass: string = "";
    private inputPlaceholder: string = "";
    private inputType: string = "";
    private uploadLabel: string = "";

    private showUpload: boolean = false;
    private showInput: boolean = false;

    withTitle(title: string) {
        this.title = title;
        return this;
    }

    withButton(name: string) {
        this.buttonName = name;
        return this;
    }

    withUpload(label: string) {
        this.showUpload = true;
        this.uploadLabel = label;
        return this;
    }

    withInput(name: string, clazz: string, placeholder: string, type: string) {
        this.showInput = true;
        this.inputName = name;
        this.inputClass = clazz;
        this.inputPlaceholder = placeholder;
        this.inputType = type;
        return this;
    }

    build() {
        let modal = new Modal(this.title, this.buttonName,
            this.inputName, this.inputClass,
            this.inputPlaceholder, this.inputType, this.uploadLabel);
        modal.showInput = this.showInput;
        modal.showUpload = this.showUpload;
        return modal;
    }

}

export class Modal extends ComponentGroup {

    btnSubmit: HTMLButtonElement;

    showUpload: boolean = false;
    showInput: boolean = false;

    textInput: ValidatableInput;


    onChangedCallback: (fileList: FileList, inputValue: string) => void | null;

    constructor(private title: string, buttonName: string, inputName: string,
                inputClass: string, inputPlaceholder: string, inputType: string,
                uploadLabel: string) {
        super([
            new UploadFileInput(uploadLabel),
            new ValidatableInput("create-chat", inputName, inputClass, inputPlaceholder, inputType, ""),
            new Button(buttonName, "common-modal__btn_submit")
        ]);
    }

    getKeys(): Keys {
        return {
            "title": this.title
        };
    }

    show() {
        this.getDOMView()!.style.display = 'flex';
    }

    hide() {
        this.getDOMView()!.style.display = 'none';
    }

    onViewCreated() {
        this.btnSubmit = <HTMLButtonElement>this.getDOMView()!.querySelector(".common-modal__btn_submit");

        let uploadFileInput = <UploadFileInput>this.getChildComponentsByName('UploadFileInput')[0];
        uploadFileInput.getDOMView()!.style.display = this.showUpload ? 'flex' : 'none';

        this.textInput = <ValidatableInput>this.getChildComponentsByName('ValidatableInput')[0];
        this.textInput.getDOMView()!.style.display = this.showInput ? 'flex' : 'none';
        window.addEventListener('click', (event: MouseEvent) => {
            if (event.target === this.getDOMView()) {
                this.hide();
            }
        });

        this.btnSubmit.onclick = () => {
            let files = uploadFileInput.fileInput.files!;
            let value = this.textInput.getInput().value;
            if (this.onChangedCallback) {
                this.onChangedCallback(files, value);
            }
        };
    }

    getTemplate(): string {
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