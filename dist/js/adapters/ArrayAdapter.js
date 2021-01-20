import { View } from "../widgets/View";
export class ArrayAdapter extends View {
    constructor() {
        super();
        this.template = '';
        this.notifyDataSetChanged();
    }
    notifyDataSetChanged() {
        this.template = '';
        for (let i = 0; i < this.getCount(); i++) {
            this.template += this.bindData(i);
        }
    }
    getTemplate() {
        return this.template;
    }
    render(view = this) {
        return this.template;
    }
}
