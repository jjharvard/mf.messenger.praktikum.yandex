import { Component } from "../../content/Component";
export class UploadFileInput extends Component {
    constructor(label) {
        super();
        this.label = label;
    }
    getKeys() {
        return {
            'uploadLabel': this.label
        };
    }
    onViewCreated() {
        this.uploadAction = this.getDOMView().querySelector(".upload-input__action");
        this.actionLabel = this.getDOMView().querySelector(".upload-input__label");
        this.fileInput = this.getDOMView().querySelector(".upload-input__file-input");
        this.fileInput.onchange = (e) => {
            let files = e.target.files;
            files && (this.actionLabel.textContent = files[0].name);
        };
    }
    getTemplate() {
        return `<div class="upload-input">
                    <label class="upload-input__label" for="upload-modal__file-input-id">{{uploadLabel}}</label>
                    <input class="upload-input__file-input" id="upload-modal__file-input-id" type="file" style="display: none;">
                    <form class="upload-input__action" method="post" enctype="multipart/form-data"></form>
                </div>`;
    }
}
//# sourceMappingURL=UploadFileInput.js.map