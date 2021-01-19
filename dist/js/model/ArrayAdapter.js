export class ArrayAdapter {
    constructor() {
        this.template = '';
    }
    notifyDataSetChanged() {
        this.template = '';
        for (let i = 0; i < this.getCount(); i++) {
            this.template += this.bindData(i);
        }
    }
    getItemsTemplate() {
        return this.template;
    }
}
