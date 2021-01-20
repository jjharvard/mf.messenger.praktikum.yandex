import { View } from "./View";
import { Templator } from "../common/Templator";
import { AdapterView } from "./AdapterView";
export class ViewGroup extends View {
    constructor(views = []) {
        super();
        this.children = [];
        this.children = views;
    }
    addView(child) {
        this.children.push(child);
    }
    getChildren() {
        return this.children;
    }
    render(view = this) {
        if (view instanceof ViewGroup) {
            let result = '';
            if (view instanceof AdapterView) {
                result = view.getAdapter().getItemsTemplate();
            }
            else {
                for (let c of this.children) {
                    result += c.render(c);
                }
            }
            result = Templator.getInstance().withTemplate(view.getTemplate()).compile({ 'group': result });
            return result;
        }
        else {
            return view.render();
        }
    }
}
