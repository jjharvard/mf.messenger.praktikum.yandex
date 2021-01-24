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
    appendTemplate(constructorName) {
        let res = '';
        for (let i = 0; i < this.items.length; i++) {
            res += '{{' + constructorName + '}}\n';
        }
        return res;
    }
}
