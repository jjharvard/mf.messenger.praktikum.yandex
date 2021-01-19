import { Templator } from "../common/Templator";
export class View {
    render(view = this) {
        return Templator.compile(this.getTemplate())(this.getProps());
    }
}
