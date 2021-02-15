import {ComponentGroup} from "../../../../_std/ComponentGroup.js";
import {UsersListComponent} from "./UsersListComponent.js";
import {ValidatableInput} from "../../../_common/ValidatableInput.js";
import {Button} from "../../../_common/Button.js";
import {UsersApi} from "../../../../api/UsersApi.js";
import {UserData} from "../../../../_std/StorageTypes.js";
import {Adapter} from "../../../../_std/Adapter.js";

export class UsersModal extends ComponentGroup {

    userListComponent: UsersListComponent;
    textInput: ValidatableInput;
    btnSubmit: HTMLButtonElement;

    onSubmitCallback: (userData: UserData[]) => void;

    constructor(private title: string, inputPlaceholder: string, btnName: string) {
        super([
            new ValidatableInput("users-modal", "users-modal", "users-modal__input", inputPlaceholder, "text", ""),
            new UsersListComponent(),
            new Button(btnName, "users-modal__btn_submit")
        ]);
    }

    show() {
        this.getDOMView()!.style.display = 'flex';
    }

    hide() {
        this.getDOMView()!.style.display = 'none';
        this.userListComponent.notify(new Adapter<UserData>([]));
        this.textInput.getInput().value = '';
    }

    getKeys(): Keys {
        return {
            'title': this.title
        };
    }

    notifyUserList(users: UserData[]) {
        this.userListComponent.notify(new Adapter<UserData>(users));
        this.textInput.getDOMView()!.style.display = 'none';
        this.show();
    }

    onViewCreated() {
        this.userListComponent = <UsersListComponent>this.getChildComponentsByName('UsersListComponent')[0];
        this.textInput = <ValidatableInput>this.getChildComponentsByName('ValidatableInput')[0];
        this.btnSubmit = <HTMLButtonElement>this.getDOMView()!.querySelector(".users-modal__btn_submit");
        this.btnSubmit.onclick = () => {
            let data: UserData[] = this.userListComponent.getCheckedUserData();
            this.onSubmitCallback && this.onSubmitCallback(data);
        };
        this.textInput.getInput().oninput = (e: Event) => {
            let value = (e.target as HTMLInputElement).value;
            UsersApi.findUser(value).then(response => {
                if (response.ok) {
                    let userData = JSON.parse(response.data) as UserData[];
                    if (userData.length) {
                        this.userListComponent.notify(new Adapter<UserData>(userData));
                    }
                }
            });
        };
        this.userListComponent.notify();

        window.addEventListener('click', (event: MouseEvent) => {
            if (event.target === this.getDOMView()) {
                this.hide();
            }
        });
    }

    getTemplate(): string {
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