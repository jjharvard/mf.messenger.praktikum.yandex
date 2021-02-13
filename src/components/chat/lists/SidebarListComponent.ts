import {ComponentGroup} from "../../../abstract/ComponentGroup.js";
import {Templator} from "../../../utils/Templator.js";
import {Adapter} from "../../../abstract/Adapter.js";
import {ChatData} from "../../../abstract/StorageTypes.js";
import {SidebarItemComponent} from "./SidebarItemComponent.js";
import {Component} from "../../../abstract/Component.js";

export class SidebarListComponent extends ComponentGroup {

    adapter: Adapter<ChatData> = new Adapter<ChatData>();
    currentItem: SidebarItemComponent;

    notify(adapter: Adapter<ChatData>) {
        this.adapter = adapter;
        this.removeAllChildren();
        let views = this.adapter.getItems().map(item => new SidebarItemComponent(item));
        this.addViews(views);
        let element = document.getElementById(this.id);
        element!.innerHTML = this.render();
        this.getChildren().forEach((component, index) => {
            let item = <SidebarItemComponent>component;
            item.onViewCreated();
            item.setOnItemClickListener(this.onItemClick.bind(this));
            if (index === 0 && !this.currentItem) {
                this.currentItem = <SidebarItemComponent>component;
                this.currentItem.setHighlighted(true);
            }
        });
    }

    onItemClick(item: Component, _: ChatData) {
        if(this.currentItem === <SidebarItemComponent> item) {
            return;
        }
        this.currentItem && this.currentItem.setHighlighted(false);
        this.currentItem = <SidebarItemComponent>item;
        this.currentItem.setHighlighted(true);
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