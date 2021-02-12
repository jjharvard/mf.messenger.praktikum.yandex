export class Adapter {
    constructor(items = []) {
        this.items = items;
    }
    getItems() {
        return this.items;
    }
    addItem(item) {
        this.items.unshift(item);
    }
}
//# sourceMappingURL=Adapter.js.map