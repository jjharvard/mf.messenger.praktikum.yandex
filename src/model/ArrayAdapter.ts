export abstract class ArrayAdapter<T> {

    private template: string = '';

    notifyDataSetChanged() {
        this.template = '';
        for (let i = 0; i < this.getCount(); i++) {
            this.template += this.bindData(i);
        }
    }

    protected abstract getItemTemplate(): string

    getItemsTemplate(): string {
        return this.template;
    }

    abstract getCount(): number

    abstract bindData(index: number): string
}