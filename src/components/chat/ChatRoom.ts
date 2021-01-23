import {ViewGroup} from "../../abstract/ViewGroup";

export class ChatRoom extends ViewGroup {

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="chat">
                    <div class="chat__title">
                        <div class="chat__name">Mick</div>
                        <button class="chat__remove"></button>
                    </div>
                        {{ChatListView}}
                </div>`;
    }

}