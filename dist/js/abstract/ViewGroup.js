import { View } from "./View";
import { Templator } from "../utils/Templator";
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
    getChildByName(name) {
        for (let c of this.children) {
            if (name === c.constructor.name) {
                return document.getElementById(c.id);
            }
        }
        return null;
    }
    render(view = this) {
        let result = '';
        let renderedChildKeys = {};
        for (let c of this.children) {
            let childTemplate = c.render(c);
            renderedChildKeys = this.merge(renderedChildKeys, { [c.constructor.name]: childTemplate });
            result += childTemplate;
        }
        let mergedKeys = this.merge(renderedChildKeys, this.convertKeys(view.getKeys()));
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(mergedKeys);
        return result;
    }
}
