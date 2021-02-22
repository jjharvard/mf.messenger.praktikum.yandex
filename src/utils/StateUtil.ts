import {HistoryState, UserProfile} from '../content/StorageTypes';

export class StateUtil {
    static ROUTER_STATE = 'router_state';
    static IS_AUTHENTICATED = 'is_authenticated';
    static USER_PROFILE = 'user_profile';

    static setRouterState(state: HistoryState) {
        localStorage.setItem(this.ROUTER_STATE, JSON.stringify(state));
    }

    static getRouterState(): HistoryState | null {
        const store = localStorage.getItem(this.ROUTER_STATE);
        if (store === null) {
            return store;
        }
        const parse = <HistoryState>JSON.parse(store);
        return parse;
    }

    static isAuthenticated(): boolean {
        return localStorage.getItem(this.IS_AUTHENTICATED) == 'true';
    }

    static setAuthenticated(isAuth: boolean) {
        localStorage.setItem(this.IS_AUTHENTICATED, isAuth + '');
    }

    static saveUserProfile(userProfile: UserProfile) {
        const currentProfile = JSON.parse(localStorage.getItem(this.USER_PROFILE) ?? '{}');
        const res = Object.assign(currentProfile, userProfile);
        localStorage.setItem(this.USER_PROFILE, JSON.stringify(res));
    }

    static getUserProfile(): UserProfile {
        return JSON.parse(localStorage.getItem(this.USER_PROFILE) ?? '{}') as UserProfile;
    }
}
