import {ViewGroup} from "../widgets/ViewGroup";

export class Chat extends ViewGroup {

    getProps(): Props2 {
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