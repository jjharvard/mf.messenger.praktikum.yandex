import {Component} from "../../content/Component";

export class UploadButton extends Component {

    getTemplate(): string {
        return `<form class="input__attach-form" method="post" enctype="multipart/form-data">
                        <input name="file" id="input__attach_id" type="file" hidden/>
                    </form>`;
    }

    getKeys(): Keys {
        return {};
    }

}