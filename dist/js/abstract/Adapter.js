export class Adapter {
    constructor(items = []) {
        this.items = items;
    }
    setData(data) {
    }
    getItems() {
        return this.items;
    }
    addItem(item) {
        this.items.unshift(item);
    }
}
