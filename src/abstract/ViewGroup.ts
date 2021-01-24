import {Component} from "./Component";
import {Templator} from "../utils/Templator";

export abstract class ViewGroup extends Component {

    children: Component[] = [];

    constructor(views: Component[] = []) {
        super();
        this.children = views;
    }

    addView(child: Component) {
        this.children.push(child);
    }

    addViews(children: Component[]) {
        this.children = [...this.children,...children]
    }

    removeAllChildren() {
        this.children = []
    }

    getChildren(): Component[] {
        return this.children;
    }

    getChildrenByName(name: string): HTMLElement[] {
        let result = []
        for(let c of this.children) {
            if(name === c.constructor.name) {
                result.push(<HTMLElement>document.getElementById(c.id))
            }
        }
        return result
    }

    render(view: Component = this): string {
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