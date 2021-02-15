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
    static isAuthenticated() {
        return localStorage.getItem(this.IS_AUTHENTICATED) == 'true';
    }
    static setAuthenticated(isAuth) {
        localStorage.setItem(this.IS_AUTHENTICATED, isAuth + "");
    }
    static saveUserProfile(userProfile) {
        var _a;
        let currentProfile = JSON.parse((_a = localStorage.getItem(this.USER_PROFILE)) !== null && _a !== void 0 ? _a : '{}');
        let res = Object.assign(currentProfile, userProfile);
        localStorage.setItem(this.USER_PROFILE, JSON.stringify(res));
    }
    static getUserProfile() {
        var _a;
        return JSON.parse((_a = localStorage.getItem(this.USER_PROFILE)) !== null && _a !== void 0 ? _a : '{}');
    }
}
StateUtil.ROUTER_STATE = 'router_state';
StateUtil.IS_AUTHENTICATED = 'is_authenticated';
StateUtil.USER_PROFILE = 'user_profile';
//# sourceMappingURL=StateUtil.js.map