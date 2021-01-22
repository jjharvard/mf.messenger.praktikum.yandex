import {View} from "./View";
import {EventBus} from "../common/EventBus";

export function Mountable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        mount(view: View) {
            let root = document.getElementById('root');
            let inner = view.render(view);
            root!.innerHTML = inner;
            window.onload = function () {
                EventBus.getInstance().emit('onViewCreated')
            }
        }
    }
}