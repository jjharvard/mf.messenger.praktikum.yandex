import {View} from "./View";
import {Templator} from "../common/Templator";
import {AdapterView} from "./AdapterView";

export abstract class ViewGroup extends View {

    children: View[] = [];

    constructor(views: View[] = []) {
        super();
        this.children = views
    }

    addView(child: View) {
        this.children.push(child);
    }

    getChildren(): View[] {
        return this.children;
    }

    render(view: View = this): string {
        if (view instanceof ViewGroup) {
            let result = '';
            if (view instanceof AdapterView) {
                result = view.getAdapter().getItemsTemplate();
            } else {
                for (let c of this.children) {
                    result += c.render(c);
                }
            }
            result = Templator.getInstance().withTemplate(view.getTemplate()).compile({'group': result});
            return result;
        } else {
            return view.render();
        }
    }

}