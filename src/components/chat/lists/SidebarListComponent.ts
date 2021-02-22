import {ComponentGroup} from '../../../content/ComponentGroup';
import {Templator} from '../../../utils/Templator';
import {Adapter} from '../../../content/Adapter';
import {ChatData} from '../../../content/StorageTypes';
import {SidebarItemComponent} from './SidebarItemComponent';
import {Component} from '../../../content/Component';
import {EventBus} from '../../../utils/EventBus';

export class SidebarListComponent extends ComponentGroup {
    adapter: Adapter<ChatData> = new Adapter<ChatData>();
    currentItem: SidebarItemComponent;

    notify(adapter: Adapter<ChatData> = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        const views = this.adapter.getItems().map(item => new SidebarItemComponent(item));
        this.addViews(views);
        this.getDOMView()!.outerHTML = this.render();
        this.getChildren().forEach((component, index) => {
            const item = <SidebarItemComponent>component;
            item.onViewCreated();
            item.setOnItemClickListener(this.onItemClick.bind(this));
            if (index === 0) {
                this.currentItem = <SidebarItemComponent>component;
                EventBus.getInstance().emit('onChatSelected', {'chatData': adapter.getItems()[0]});
            }
        });
    }

    onItemClick(item: Component, chatData: ChatData) {
        if (this.currentItem === <SidebarItemComponent>item) {
            return;
        }
        this.adapter.getItems().forEach(dataItem => dataItem.isActive = chatData.id === dataItem.id);
        this.currentItem && this.currentItem.setHighlighted(false);
        this.currentItem = <SidebarItemComponent>item;
        this.currentItem.setHighlighted(true);
        EventBus.getInstance().emit('onChatSelected', {chatData});
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="sidebar">
                    <ul class="sidebar__list">
                        ${Templator.appendTemplate('{{SidebarItemComponent}}', this.adapter.getItems().length)}
                    </ul>
                </div>`;
    }
}
