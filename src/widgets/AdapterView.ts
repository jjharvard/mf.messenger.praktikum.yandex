import {ArrayAdapter} from '../model/ArrayAdapter';
import {ViewGroup} from "./ViewGroup";

export abstract class AdapterView<T extends ArrayAdapter<any>> extends ViewGroup {

    adapter: T;

    constructor() {
        super();
    }

    setAdapter(adapter: T) {
        this.adapter = adapter;
    }

    getAdapter(): T {
        return this.adapter;
    }

}