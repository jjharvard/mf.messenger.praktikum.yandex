import { EventBus } from "../utils/EventBus.js";
export class Page {
    constructor(view) {
        this.view = view;
    }
    mount() {
        let root = document.getElementById('root');
        let inner = this.view.render(this.view);
        root.innerHTML = inner;
        console.log(inner);
        window.onload = function () {
            EventBus.getInstance().emit('onViewCreated');
        };
    }
}
//# sourceMappingURL=Page.js.map