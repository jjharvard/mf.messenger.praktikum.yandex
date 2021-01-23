import {View} from "./View";
import {Templator} from "../common/Templator";

export abstract class ViewGroup extends View {

    children: View[] = [];

    constructor(views: View[] = []) {
        super();
        this.children = views;
    }

    addView(child: View) {
        this.children.push(child);
    }

    getChildren(): View[] {
        return this.children;
    }

    getChildByName(name: string): HTMLElement | null {
        for(let c of this.children) {
            if(name === c.constructor.name) {
                return document.getElementById(c.id)
            }
        }
        return null
    }

    render(view: View = this): string {
        let result = '';
        let renderedChildKeys = {};
        for (let c of this.children) {
            let childTemplate = c.render(c)
            renderedChildKeys = Object.assign(renderedChildKeys, {[c.constructor.name]: childTemplate});
            result += childTemplate;
        }
        let mergedKeys = Object.assign(this.convertKeys(view.getKeys()), renderedChildKeys)
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(mergedKeys, {'uuid': this.id}));
        return result;
    }

}