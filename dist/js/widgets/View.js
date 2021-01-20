import { Templator } from "../common/Templator";
export class View {
    render(view = this) {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(view.getProps());
    }
}
