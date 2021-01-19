import { View } from "./View";
import { Templator } from "../common/Templator";
import { AdapterView } from "./AdapterView";
export class ViewGroup extends View {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    addView(child) {
        this.children.push(child);
    }
    getChildren() {
        return this.children;
    }
    render(view) {
        if (view instanceof ViewGroup) {
            let result = '';
            if (view instanceof AdapterView) {
                result = view.getAdapter().getItemsTemplate();
            }
            else {
                for (let c of this.children) {
                    result += view.render(c);
                }
            }
            result = Templator.compile(view.getTemplate())({ 'group': result });
            return result;
        }
        else {
            return view.render();
        }
    }
}
