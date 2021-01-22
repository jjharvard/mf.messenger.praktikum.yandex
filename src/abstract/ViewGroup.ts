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

    render(view: View = this): string {
        let result = '';
        let childProps = {};
        for (let c of this.children) {
            let childTemplate = c.render(c)
            childProps = Object.assign(childProps, {[c.constructor.name]: childTemplate});
            result += childTemplate;
        }
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(this.convertProps(view.getProps()), {'uuid': this.id}));
        return result;
    }

}