import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Router} from "../../abstract/Router.js";

export class User extends ComponentGroup {
    getKeys(): Keys {
        return {};
    }

    onViewCreated(): boolean {
        if (super.onViewCreated()) {
            let btnProfile = <HTMLButtonElement>this.getDOMView()!.querySelector('.user__profile');
            btnProfile.onclick = () => {
                Router.getInstance().push('/profile');
            };
            return true;
        } else {
            return false;
        }
    }

    getTemplate(): string {
        return `<div class="user">
                    <button class="user__add">
                        Add
                        <i class="arrow"></i>
                    </button>
                    <button class="user__profile">
                        Profile
                        <i class="arrow"></i>
                    </button>
                    <input id="user__search_id" class="user__search" type="text" placeholder="Search">
                </div>
            `;
    }

}