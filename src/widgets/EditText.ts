import {ViewGroup} from "./ViewGroup";

export class EditText extends ViewGroup {

    getTemplate(): string {
        return `
                <div class="input">
                    <label class="input__attach" for="input__attach_id"></label>
                    {{UploadButton}}
                    {{InputMessage}}
                   {{Button}}
                </div>
            `;
    }

    getProps(): Props2 {
        return {}
    }

}