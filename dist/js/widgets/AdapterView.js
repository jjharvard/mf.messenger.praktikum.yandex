import { ViewGroup } from "./ViewGroup";
export class AdapterView extends ViewGroup {
    constructor() {
        super();
    }
    setAdapter(adapter) {
        this.adapter = adapter;
    }
    getAdapter() {
        return this.adapter;
    }
}
