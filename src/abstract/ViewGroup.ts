import {View} from "./View";
import {Templator} from "../utils/Templator";

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
        let renderedChildKeys: ArrayKeys = {};
        for (let c of this.children) {
            let childTemplate = c.render(c)
            renderedChildKeys = this.merge(renderedChildKeys, {[c.constructor.name]: childTemplate});
            result += childTemplate;
        }
        let mergedKeys = this.merge(renderedChildKeys, this.convertKeys(view.getKeys()))
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(mergedKeys);
        return result;
    }

}