import {ViewGroup} from "./ViewGroup";

export class EditText extends ViewGroup {

    getTemplate(): string {
        return `
                <div class="input">
                    <label class="input__attach" for="input__attach_id"></label>
                    {{UploadButton}}
                    <input id="input__edit_id" name="message" class="input__edit" type="text" placeholder="Message">
                   {{Button}}
                </div>
            `;
    }

    getProps(): Props {
        return {};
    }

}