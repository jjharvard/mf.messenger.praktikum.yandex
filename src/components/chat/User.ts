import {ComponentGroup} from "../../abstract/ComponentGroup.js";

export class User extends ComponentGroup {
    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="user">
                    <button class="user__add">
                        Add
                        <i class="arrow"></i>
                    </button>
                    <button class="user__profile" onclick="location.href='#profile'">
                        Profile
                        <i class="arrow"></i>
                    </button>
                    <input id="user__search_id" class="user__search" type="text" placeholder="Search">
                </div>
            `;
    }

}