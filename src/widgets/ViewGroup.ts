import {View} from "./View";
import {Templator} from "../common/Templator";
import {AdapterView} from "../adapters/AdapterView";

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
            // if (view instanceof AdapterView) {
            //     let adapter = view.getAdapter()
            //     result = adapter.getItemsTemplate();
            //     result = Templator.getInstance().withTemplate(view.getTemplate()).compile({[adapter.constructor.name]: result});
            // } else {
                let childProps = {};
                for (let c of this.children) {
                    console.log(c.constructor.name);
                    result += c.render(c);
                    childProps = Object.assign(childProps, {[c.constructor.name]: c.render(c)});
                }
                console.log(childProps);
                result = Templator.getInstance().withTemplate(view.getTemplate()).compile(childProps);
            // }
            return result;
        } else {
            return view.render();
        }
    }

}