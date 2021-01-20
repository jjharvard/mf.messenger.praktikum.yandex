import {View} from "../widgets/View";

export abstract class ArrayAdapter extends View {

    private template: string = '';

    constructor() {
        super();
        this.notifyDataSetChanged()
    }

    notifyDataSetChanged() {
        this.template = '';
        for (let i = 0; i < this.getCount(); i++) {
            this.template += this.bindData(i);
        }
    }

    abstract getCount(): number

    abstract bindData(index: number): string

    getTemplate(): string {
        return this.template;
    }

    render(view: View = this): string {
        return this.template;
    }
}