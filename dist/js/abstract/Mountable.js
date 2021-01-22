import { EventBus } from "../common/EventBus";
export function Mountable(Base) {
    return class extends Base {
        mount(view) {
            let root = document.getElementById('root');
            let inner = view.render(view);
            console.log(inner);
            root.innerHTML = inner;
            window.onload = function () {
                EventBus.getInstance().emit('onViewCreated');
            };
        }
    };
}
