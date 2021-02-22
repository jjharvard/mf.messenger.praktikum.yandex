import { StateUtil } from "../utils/StateUtil";
import { AuthApi } from "../api/AuthApi";
export class Router {
    constructor() {
        this.shouldExit = false;
        this.routes = [];
        this.logout = (path) => AuthApi.logOut().then(_ => this._onRoute(path));
        window.onpopstate = (e) => {
            if (this.shouldExit) {
                if (e.state.path === '/login' || e.state.path === '/sign') {
                    this.shouldExit = false;
                    this._onRoute(e.state.path);
                }
                else {
                    history.back();
                }
                return;
            }
            let prevPath = this.currentRoute.path;
            let path = e.state ? e.state.path : '';
            if ((prevPath === '/chat' && path === '/login') || (prevPath === '/chat' && path === '/sign')) { // going back from chat
                this.logout(e.state.path);
            }
            else if ((prevPath === '/login' && path !== '/sign') || (prevPath === '/sign' && path !== '/login')) { // going forward from login or sign
                if (StateUtil.isAuthenticated()) {
                    this._onRoute(e.state.path);
                }
                else {
                    history.replaceState({ path: prevPath }, '', prevPath);
                }
            }
            else {
                this._onRoute(e.state.path);
            }
        };
    }
    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return this.instance;
    }
    _onRoute(path) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.page.hide();
        }
        this.currentRoute = route;
        StateUtil.setRouterState({
            currUri: this.currentRoute.path,
            length: history.length
        });
        this.currentRoute.page.show();
    }
    push(path) {
        history.pushState({ path }, "", path);
        this._onRoute(path);
    }
    replace(path) {
        history.replaceState({ path }, "", path);
        this._onRoute(path);
    }
    back() {
        history.back();
    }
    exit() {
        this.shouldExit = true;
        history.back();
    }
    start(path) {
        let state = StateUtil.getRouterState();
        if (state && state.length === history.length) {
            this.replace(state.currUri);
        }
        else {
            this.push(path);
        }
    }
    getRoute(path) {
        return this.routes.find(route => route.path === path);
    }
    addRoutes(routes) {
        routes.forEach(route => {
            this.routes.push(route);
        });
    }
}
//# sourceMappingURL=Router.js.map