import { Adapter } from "./Adapter";
export class ViewAdapter extends Adapter {
    constructor(items = []) {
        super(items);
    }
    static _preRendered() {
        return [
            `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
            'hello',
            'How are you'
        ];
    }
}
