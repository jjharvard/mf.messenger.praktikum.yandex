import { Component } from "./Component.js";
import { Templator } from "../utils/Templator.js";
import { Router } from "./Router.js";
export class ComponentGroup extends Component {
    constructor(views = []) {
        super();
        this.children = [];
        this.children = views;
    }
    addView(child) {
        this.children.push(child);
    }
    addViews(children) {
        this.children = [...this.children, ...children];
    }
    removeAllChildren() {
        this.children = [];
    }
    getChildren() {
        return this.children;
    }
    getChildComponentsByName(name) {
        let result = [];
        for (let c of this.children) {
            if (name === c.constructor.name) {
                result.push(c);
            }
        }
        return result;
    }
    getChildElementsByName(name) {
        let result = [];
        for (let c of this.children) {
            if (name === c.constructor.name) {
                result.push(document.getElementById(c.id));
            }
        }
        return result;
    }
    validateOnClick(btn, validatableInputs, onNext) {
        btn.onclick = () => {
            let hasError = false;
            validatableInputs.forEach((vi) => {
                if (!hasError) {
                    hasError = vi.check();
                }
            });
            if (Router.getInstance().currentRoute.path === '/profile-change-password' && validatableInputs[1].getInput().value !== validatableInputs[2].getInput().value) {
                validatableInputs[2].showMessage("Passwords do not match");
            }
            if (Router.getInstance().currentRoute.path === '/sign' && validatableInputs[5].getInput().value !== validatableInputs[6].getInput().value) {
                validatableInputs[6].showMessage("Passwords do not match");
            }
            if (!hasError) {
                onNext();
            }
        };
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
//# sourceMappingURL=ComponentGroup.js.map