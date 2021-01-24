

export class Adapter<T> {

    constructor(protected items: T[] = []) {
    }

    setData(data: T) {

    }

    getItems(): T[] {
        return this.items
    }

    addItem(item: T) {
        this.items.unshift(item)
    }

    appendTemplate(constructorName: string): string {
        let res = '';
        for (let i = 0; i < this.items.length; i++) {
            res += '{{' + constructorName + '}}\n';
        }
        return res;
    }

}