import { ComponentGroup } from "../../../../abstract/ComponentGroup.js";
import { Templator } from "../../../../utils/Templator.js";
import { Adapter } from "../../../../abstract/Adapter.js";
import { UserItemComponent } from "./UserItemComponent.js";
export class UsersListComponent extends ComponentGroup {
    constructor() {
        super(...arguments);
        this.adapter = new Adapter();
    }
    notify(adapter = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        let views = this.adapter.getItems().map(item => new UserItemComponent(item));
        this.addViews(views);
        this.getDOMView().outerHTML = this.render();
        this.getChildren().forEach(c => c.onViewCreated());
        this.onViewCreated();
    }
    getKeys() {
        return {};
    }
    getCheckedUserData() {
        let views = this.getChildComponentsByName('UserItemComponent');
        let data = [];
        for (let i = 0; i < views.length; i++) {
            if (views[i].checkbox.checked) {
                data.push(this.adapter.getItems()[i]);
            }
        }
        return data;
    }
    getTemplate() {
        return `<div class="users-modal__list-container">
                    <ul class="users-modal__list">
                        ${Templator.appendTemplate('{{UserItemComponent}}', this.adapter.getItems().length)}
                    </ul>
                </div>`;
    }
}
//# sourceMappingURL=UsersListComponent.js.map