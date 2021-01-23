import { ViewGroup } from "../../abstract/ViewGroup";
export class EditText extends ViewGroup {
    getTemplate() {
        return `
                <div class="input">
                    <label class="input__attach" for="input__attach_id"></label>
                    {{UploadButton}}
                    {{InputMessage}}
                    {{Button}}
                </div>
            `;
    }
    getKeys() {
        return {};
    }
}
