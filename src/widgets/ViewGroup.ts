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
        if (view instanceof ViewGroup) {
            let result = '';
            let childProps = {};
            for (let c of this.children) {
                result += c.render(c);
                childProps = Object.assign(childProps, {[c.constructor.name]: c.render(c)});
            }
            result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(childProps, {'uuid': this.id}));
            return result;
        } else {
            return view.render();
        }
    }

}