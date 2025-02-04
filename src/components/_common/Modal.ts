import {Button} from './Button';
import {ComponentGroup} from '../../content/ComponentGroup';
import {UploadFileInput} from './UploadFileInput';
import {ValidatableInput} from './ValidatableInput';

export class ModalBuilder {
    private buttonName: string = '';
    private title: string = '';
    private inputName: string = '';
    private inputClass: string = '';
    private inputPlaceholder: string = '';
    private inputType: string = '';
    private uploadLabel: string = '';
    private validationClassPrefix: string = '';

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

    withInput(validationClassPrefix: string, name: string, clazz: string, placeholder: string, type: string) {
        this.showInput = true;
        this.validationClassPrefix = validationClassPrefix;
        this.inputName = name;
        this.inputClass = clazz;
        this.inputPlaceholder = placeholder;
        this.inputType = type;
        return this;
    }

    build() {
        const modal = new Modal(this.title, this.buttonName,
            this.inputName, this.inputClass,
            this.inputPlaceholder, this.inputType, this.uploadLabel, this.validationClassPrefix);
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
    uploadFileInput: UploadFileInput;


    onChangedCallback: (fileList: FileList, inputValue: string) => void | null;

    constructor(private title: string, buttonName: string, inputName: string,
                inputClass: string, inputPlaceholder: string, inputType: string,
                uploadLabel: string, validationClassPrefix: string) {
        super([
            new UploadFileInput(uploadLabel),
            new ValidatableInput(validationClassPrefix, inputName, inputClass, inputPlaceholder, inputType, ''),
            new Button(buttonName, 'common-modal__btn_submit')
        ]);
    }

    getKeys(): Keys {
        return {
            'title': this.title
        };
    }

    show() {
        this.getDOMView()!.style.display = 'flex';
    }

    hide() {
        this.getDOMView()!.style.display = 'none';
    }

    clear() {
        this.textInput.getInput().value = '';
    }

    onViewCreated() {
        this.btnSubmit = <HTMLButtonElement> this.getDOMView()!.querySelector('.common-modal__btn_submit');

        this.uploadFileInput = <UploadFileInput> this.getChildComponentsByName('UploadFileInput')[0];
        this.uploadFileInput.getDOMView()!.style.display = this.showUpload ? 'flex' : 'none';

        this.textInput = <ValidatableInput> this.getChildComponentsByName('ValidatableInput')[0];
        this.textInput.getDOMView()!.style.display = this.showInput ? 'flex' : 'none';
        window.addEventListener('click', (event: MouseEvent) => {
            if (event.target === this.getDOMView()) {
                this.hide();
            }
        });

        this.btnSubmit.onclick = () => {
            const files = this.uploadFileInput.fileInput.files!;
            const value = this.textInput.getInput().value;
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
