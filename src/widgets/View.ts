import {Templator} from "../common/Templator";

export abstract class View {

    abstract getTemplate(): string

    abstract getProps(): Props

    render(view: View = this): string {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(view.getProps());
    }
}