import { Router } from "../../_std/Router.js";
import { ArrowButton } from "../_common/ArrowButton.js";
import { ComponentGroup } from "../../_std/ComponentGroup.js";
export class User extends ComponentGroup {
    constructor() {
        super([new ArrowButton('Add Chat', 'user__chat-add'),
            new ArrowButton('Profile', 'user__profile')]);
    }
    getKeys() {
        return {};
    }
    onViewCreated() {
        let btnProfile = this.getDOMView().querySelector('.user__profile');
        btnProfile.onclick = () => {
            Router.getInstance().push('/profile');
        };
        this.btnAddChat = this.getDOMView().querySelector('.user__chat-add');
    }
    getTemplate() {
        return `<div class="user">
                    {{ArrowButton}}
                    {{ArrowButton}}
                    <input id="user__search_id" class="user__search" type="text" placeholder="Search">
                </div>
            `;
    }
}
//# sourceMappingURL=User.js.map