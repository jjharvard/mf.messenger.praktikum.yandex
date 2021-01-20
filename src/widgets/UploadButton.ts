import {View} from "./View";

export class UploadButton extends View {
    getProps(): Props {
        return {};
    }

    getTemplate(): string {
        return `<form class="input__attach-form" method="post" enctype="multipart/form-data">
                        <input name="file" id="input__attach_id" type="file" hidden/>
                    </form>`;
    }

}