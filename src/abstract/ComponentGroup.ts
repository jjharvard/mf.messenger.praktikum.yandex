import {Component} from "./Component.js";
import {Templator} from "../utils/Templator.js";
import {ValidatableInput} from "../components/_common/ValidatableInput.js";

export abstract class ComponentGroup extends Component {

    children: Component[] = [];

    constructor(views: Component[] = []) {
        super();
        this.children = views;
    }

    addView(child: Component) {
        this.children.push(child);
    }

    addViews(children: Component[]) {
        this.children = [...this.children, ...children];
    }

    removeAllChildren() {
        this.children = [];
    }

    getChildren(): Component[] {
        return this.children;
    }

    getChildComponentsByName(name: string): Component[] {
        let result = [];
        for (let c of this.children) {
            if (name === c.constructor.name) {
                result.push(c);
            }
        }
        return result;
    }

    getChildElementsByName(name: string): HTMLElement[] {
        let result = [];
        for (let c of this.children) {
            if (name === c.constructor.name) {
                result.push(<HTMLElement>document.getElementById(c.id));
            }
        }
        return result;
    }

    validateOnClick(btn: HTMLButtonElement, validatableInputs: ValidatableInput[], onNext: () => void) {
        btn.onclick = () => {
            let hasError = false;
            validatableInputs.forEach((vi) => {
                if (!hasError) {
                    hasError = vi.check();
                }
            });
            if (!hasError) {
                onNext();
            }
        };
    }

    render(view: Component = this): string {
        let result = '';
        let renderedChildKeys: ArrayKeys = {};
        for (let c of this.children) {
            let childTemplate = c.render(c);
            renderedChildKeys = this.merge(renderedChildKeys, {[c.constructor.name]: childTemplate});
            result += childTemplate;
        }
        let mergedKeys = this.merge(renderedChildKeys, this.convertKeys(view.getKeys()));
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(mergedKeys);
        return result;
    }

}