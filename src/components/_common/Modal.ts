import {Component} from "../../abstract/Component.js";
import {UsersApi} from "../../api/UsersApi.js";

export class Modal extends Component {

    uploadAction: HTMLDivElement;
    actionLabel: HTMLLabelElement;
    fileInput: HTMLInputElement;
    btnSubmit: HTMLButtonElement;

    onChangedCallback: () => void | null;

    getKeys(): Keys {
        return {};
    }

    show() {
        this.uploadAction.appendChild(this.actionLabel);
        this.uploadAction.appendChild(this.fileInput);
        this.getDOMView()!.style.display = 'flex';
    }

    hide() {
        this.getDOMView()!.style.display = 'none';
    }

    private createActionLabel(): HTMLLabelElement {
        let actionLabel = document.createElement('label');
        actionLabel.setAttribute('for', 'upload-modal__id');
        actionLabel.textContent = 'Choose the file on your computer';
        actionLabel.style.textDecoration = 'underline';
        actionLabel.style.textAlign = 'center';
        actionLabel.style.cursor = 'pointer';
        return actionLabel;
    }

    private createFileInput(): HTMLInputElement {
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('id', 'upload-modal__id');
        fileInput.style.display = 'none';
        return fileInput;
    }

    onViewCreated(): boolean {
        if (super.onViewCreated()) {
            this.uploadAction = <HTMLDivElement>this.getDOMView()!.querySelector(".upload-modal__action");
            this.btnSubmit = <HTMLButtonElement>this.getDOMView()!.querySelector(".upload-modal__btn_submit");
            this.actionLabel = this.createActionLabel();
            this.fileInput = this.createFileInput();
            this.fileInput.onchange = (e: Event) => {
                let files = (e.target as HTMLInputElement).files;
                files && (this.actionLabel.textContent = files[0].name);
            };
            window.addEventListener('click', (event: MouseEvent) => {
                if (event.target === this.getDOMView()) {
                    while (this.uploadAction.firstChild) {
                        this.uploadAction.removeChild(this.uploadAction.lastChild!);
                    }
                    this.hide();
                }
            });
            this.btnSubmit.onclick = () => {
                let files = this.fileInput.files;
                if (files) {
                    UsersApi.changeAvatar(files)
                        .then(_ => {
                            this.hide();
                            if (this.onChangedCallback) {
                                this.onChangedCallback();
                            }
                        });
                }
            };
            return true;
        } else {
            return false;
        }
    }

    getTemplate(): string {
        return `
            <div class="upload-modal">
                <div class="upload-modal__content">
                    <b class="upload-modal__title">Upload File</b>
                    <form class="upload-modal__action" method="post" enctype="multipart/form-data"></form>
                    <button class="upload-modal__btn_submit">Change</button>
                </div>
            </div>
            `;
    }

}