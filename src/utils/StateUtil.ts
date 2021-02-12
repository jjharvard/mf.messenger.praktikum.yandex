import {HistoryState} from "../abstract/HistoryState.js";

export class StateUtil {

    static ROUTER_STATE = 'router_state';
    static IS_AUTHENTICATED = 'is_authenticated';

    static setRouterState(state: HistoryState) {
        localStorage.setItem(this.ROUTER_STATE, JSON.stringify(state));
    }

    static getRouterState(): HistoryState | null {
        let store = localStorage.getItem(this.ROUTER_STATE);
        if (store === null) {
            return store;
        }
        let parse = <HistoryState>JSON.parse(store);
        return parse;
    }

    static isAuthenticated(): boolean {
        return localStorage.getItem(this.IS_AUTHENTICATED) == 'true';
    }

    static setAuthenticated(isAuth: boolean) {
        localStorage.setItem(this.IS_AUTHENTICATED, isAuth + "");
    }

}