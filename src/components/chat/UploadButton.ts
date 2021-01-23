import {View} from "../../abstract/View";

export class UploadButton extends View {

    getTemplate(): string {
        return `<form class="input__attach-form" method="post" enctype="multipart/form-data">
                        <input name="file" id="input__attach_id" type="file" hidden/>
                    </form>`;
    }

    getProps(): Keys {
        return {};
    }

}