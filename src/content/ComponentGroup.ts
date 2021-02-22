import {Component} from './Component';
import {Templator} from '../utils/Templator';
import {ValidatableInput} from '../components/_common/ValidatableInput';
import {Router} from './Router';

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
        const result = [];
        for (const c of this.children) {
            if (name === c.constructor.name) {
                result.push(c);
            }
        }
        return result;
    }

    getChildElementsByName(name: string): HTMLElement[] {
        const result = [];
        for (const c of this.children) {
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
            if (Router.getInstance().currentRoute.path === '/profile-change-password' && validatableInputs[1].getInput().value !== validatableInputs[2].getInput().value) {
                validatableInputs[2].showMessage('Passwords do not match');
            }
            if (Router.getInstance().currentRoute.path === '/sign' && validatableInputs[5].getInput().value !== validatableInputs[6].getInput().value) {
                validatableInputs[6].showMessage('Passwords do not match');
            }
            if (!hasError) {
                onNext();
            }
        };
    }

    render(view: Component = this): string {
        let result = '';
        let renderedChildKeys: ArrayKeys = {};
        for (const c of this.children) {
            const childTemplate = c.render(c);
            renderedChildKeys = this.merge(renderedChildKeys, {[c.constructor.name]: childTemplate});
            result += childTemplate;
        }
        const mergedKeys = this.merge(renderedChildKeys, this.convertKeys(view.getKeys()));
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(mergedKeys);
        return result;
    }
}
