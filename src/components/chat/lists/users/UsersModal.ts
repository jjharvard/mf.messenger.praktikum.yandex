import {ComponentGroup} from "../../../../abstract/ComponentGroup.js";
import {UsersListComponent} from "./UsersListComponent.js";
import {ValidatableInput} from "../../../_common/ValidatableInput.js";
import {Button} from "../../../_common/Button.js";
import {UsersApi} from "../../../../api/UsersApi.js";
import {UserData} from "../../../../abstract/StorageTypes.js";
import {Adapter} from "../../../../abstract/Adapter.js";

export class UsersModal extends ComponentGroup {

    userListComponent: UsersListComponent;
    textInput: ValidatableInput;
    btnSubmit: HTMLButtonElement;

    onSubmitCallback: (userData: UserData[]) => void;

    constructor() {
        super([
            new ValidatableInput("users-modal", "users-modal", "users-modal__input", "User Login", "text", ""),
            new UsersListComponent(),
            new Button("Submit", "users-modal__btn_submit")
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
            'title': 'List Modal'
        };
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