import { View } from "./View";
class EditText extends View {
    getTemplate() {
        return `
                <div class="input">
                    <label class="input__attach" for="input__attach_id"></label>
                    <form class="input__attach-form" method="post" enctype="multipart/form-data">
                        <input name="file" id="input__attach_id" type="file" hidden/>
                    </form>
                    
                    <button id="input__send_id" class="input__send"></button>
                </div>
            `;
    }
    getProps() {
        return undefined;
    }
}
