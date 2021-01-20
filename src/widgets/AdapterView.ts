import {ArrayAdapter} from '../model/ArrayAdapter';
import {ViewGroup} from "./ViewGroup";

export abstract class AdapterView<T extends ArrayAdapter<unknown>> extends ViewGroup {

    adapter: T;

    constructor(adapter: T) {
        super();
        this.adapter = adapter
        this.adapter.notifyDataSetChanged()
    }

    getAdapter(): T {
        return this.adapter;
    }

}