import { Component } from "../../abstract/Component";
export class UploadButton extends Component {
    getTemplate() {
        return `<form class="input__attach-form" method="post" enctype="multipart/form-data">
                        <input name="file" id="input__attach_id" type="file" hidden/>
                    </form>`;
    }
    getKeys() {
        return {};
    }
}
