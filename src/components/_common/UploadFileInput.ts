import {Component} from "../../_std/Component.js";

export class UploadFileInput extends Component {

    uploadAction: HTMLDivElement;
    actionLabel: HTMLLabelElement;
    fileInput: HTMLInputElement;

    constructor(private label: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'uploadLabel': this.label
        };
    }

    onViewCreated() {
        this.uploadAction = <HTMLDivElement>this.getDOMView()!.querySelector(".upload-input__action");
        this.actionLabel = <HTMLLabelElement>this.getDOMView()!.querySelector(".upload-input__label");
        this.fileInput = <HTMLInputElement>this.getDOMView()!.querySelector(".upload-input__file-input");
        this.fileInput.onchange = (e: Event) => {
            let files = (e.target as HTMLInputElement).files;
            files && (this.actionLabel.textContent = files[0].name);
        };
    }


    getTemplate(): string {
        return `<div class="upload-input">
                    <label class="upload-input__label" for="upload-modal__file-input-id">{{uploadLabel}}</label>
                    <input class="upload-input__file-input" id="upload-modal__file-input-id" type="file" style="display: none;">
                    <form class="upload-input__action" method="post" enctype="multipart/form-data"></form>
                </div>`;
    }

}