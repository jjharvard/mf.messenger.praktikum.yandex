import { ViewGroup } from "../widgets/ViewGroup";
export class Chat extends ViewGroup {
    getProps() {
        return {};
    }
    getTemplate() {
        return `<div class="chat">
                    <div class="chat__title">
                        <div class="chat__name">Mick</div>
                        <button class="chat__remove"></button>
                    </div>
                        {{ChatListView}}
                </div>`;
    }
}
