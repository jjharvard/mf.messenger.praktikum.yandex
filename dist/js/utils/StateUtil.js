export class StateUtil {
    static setRouterState(state) {
        localStorage.setItem(this.ROUTER_STATE, JSON.stringify(state));
    }
    static getRouterState() {
        let store = localStorage.getItem(this.ROUTER_STATE);
        if (store === null) {
            return store;
        }
        let parse = JSON.parse(store);
        return parse;
    }
}
StateUtil.ROUTER_STATE = 'router_state';
//# sourceMappingURL=StateUtil.js.map