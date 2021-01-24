

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

}