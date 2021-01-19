import {Templator} from "../common/Templator";

export abstract class View {

    abstract getTemplate(): string

    abstract getProps(): Object

    render(view: View = this): string {
        return Templator.compile(this.getTemplate())(this.getProps());
    }
}