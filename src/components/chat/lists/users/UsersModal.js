import { ComponentGroup } from "../../../../content/ComponentGroup";
import { UsersListComponent } from "./UsersListComponent";
import { ValidatableInput } from "../../../_common/ValidatableInput";
import { Button } from "../../../_common/Button";
import { UsersApi } from "../../../../api/UsersApi";
import { Adapter } from "../../../../content/Adapter";
export class UsersModal extends ComponentGroup {
    constructor(title, inputPlaceholder, btnName) {
        super([
            new ValidatableInput("users-modal", "users-modal", "users-modal__input", inputPlaceholder, "text", ""),
            new UsersListComponent(),
            new Button(btnName, "users-modal__btn_submit")
        ]);
        this.title = title;
    }
    show() {
        this.getDOMView().style.display = 'flex';
    }
    hide() {
        this.getDOMView().style.display = 'none';
        this.userListComponent.notify(new Adapter([]));
        this.textInput.getInput().value = '';
    }
    getKeys() {
        return {
            'title': this.title
        };
    }
    notifyUserList(users) {
        this.userListComponent.notify(new Adapter(users));
        this.textInput.getDOMView().style.display = 'none';
        this.show();
    }
    onViewCreated() {
        this.userListComponent = this.getChildComponentsByName('UsersListComponent')[0];
        this.textInput = this.getChildComponentsByName('ValidatableInput')[0];
        this.btnSubmit = this.getDOMView().querySelector(".users-modal__btn_submit");
        this.btnSubmit.onclick = () => {
            let data = this.userListComponent.getCheckedUserData();
            this.onSubmitCallback && this.onSubmitCallback(data);
        };
        this.textInput.getInput().oninput = (e) => {
            let value = e.target.value;
            UsersApi.findUser(value).then(response => {
                if (response.ok) {
                    let userData = JSON.parse(response.data);
                    if (userData.length) {
                        this.userListComponent.notify(new Adapter(userData));
                    }
                }
            });
        };
        this.userListComponent.notify();
        window.addEventListener('click', (event) => {
            if (event.target === this.getDOMView()) {
                this.hide();
            }
        });
    }
    getTemplate() {
        return `<div class="users-modal">
                    <div class="users-modal__content">
                        <p class="users-modal__title">{{title}}</p>
                        {{ValidatableInput}}
                        {{UsersListComponent}}
                        {{Button}}
                    </div>
                </div>`;
    }
}
//# sourceMappingURL=UsersModal.js.map