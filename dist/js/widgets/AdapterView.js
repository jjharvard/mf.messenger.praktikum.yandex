import { ViewGroup } from "./ViewGroup";
export class AdapterView extends ViewGroup {
    constructor(adapter) {
        super();
        this.adapter = adapter;
        this.adapter.notifyDataSetChanged();
    }
    getAdapter() {
        return this.adapter;
    }
}
