import { ComponentGroup } from "../../../content/ComponentGroup.js";
import { Templator } from "../../../utils/Templator.js";
import { Adapter } from "../../../content/Adapter.js";
import { SidebarItemComponent } from "./SidebarItemComponent.js";
import { EventBus } from "../../../utils/EventBus.js";
export class SidebarListComponent extends ComponentGroup {
    constructor() {
        super(...arguments);
        this.adapter = new Adapter();
    }
    notify(adapter = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        let views = this.adapter.getItems().map(item => new SidebarItemComponent(item));
        this.addViews(views);
        this.getDOMView().outerHTML = this.render();
        this.getChildren().forEach((component, index) => {
            let item = component;
            item.onViewCreated();
            item.setOnItemClickListener(this.onItemClick.bind(this));
            if (index === 0) {
                this.currentItem = component;
                EventBus.getInstance().emit('onChatSelected', { 'chatData': adapter.getItems()[0] });
            }
        });
    }
    onItemClick(item, chatData) {
        if (this.currentItem === item) {
            return;
        }
        this.adapter.getItems().forEach(dataItem => dataItem.isActive = chatData.id === dataItem.id);
        this.currentItem && this.currentItem.setHighlighted(false);
        this.currentItem = item;
        this.currentItem.setHighlighted(true);
        EventBus.getInstance().emit('onChatSelected', { chatData });
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<div class="sidebar">
                    <ul class="sidebar__list">
                        ${Templator.appendTemplate('{{SidebarItemComponent}}', this.adapter.getItems().length)}
                    </ul>
                </div>`;
    }
}
//# sourceMappingURL=SidebarListComponent.js.map