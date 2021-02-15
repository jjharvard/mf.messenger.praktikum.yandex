import {ComponentGroup} from "../../../../content/ComponentGroup";
import {Templator} from "../../../../utils/Templator";
import {UserData} from "../../../../content/StorageTypes";
import {Adapter} from "../../../../content/Adapter";
import {UserItemComponent} from "./UserItemComponent";

export class UsersListComponent extends ComponentGroup {

    adapter: Adapter<UserData> = new Adapter<UserData>();

    notify(adapter: Adapter<UserData> = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        let views = this.adapter.getItems().map(item => new UserItemComponent(item));
        this.addViews(views);
        this.getDOMView()!.outerHTML = this.render();
        this.getChildren().forEach(c => c.onViewCreated())
        this.onViewCreated()
    }

    getKeys(): Keys {
        return {};
    }

    getCheckedUserData(): UserData[] {
        let views = <UserItemComponent[]>this.getChildComponentsByName('UserItemComponent');
        let data: UserData[] = [];
        for (let i = 0; i < views.length; i++) {
            if (views[i].checkbox.checked) {
                data.push(this.adapter.getItems()[i]);
            }
        }
        return data;
    }

    getTemplate(): string {
        return `<div class="users-modal__list-container">
                    <ul class="users-modal__list">
                        ${Templator.appendTemplate('{{UserItemComponent}}', this.adapter.getItems().length)}
                    </ul>
                </div>`;
    }
}