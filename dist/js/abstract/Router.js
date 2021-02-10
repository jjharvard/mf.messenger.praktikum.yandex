import { StateUtil } from "../utils/StateUtil.js";
export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', (e) => {
            let prevPath = this.currentRoute.path;
            let path = e.state.path;
            console.log('ON_POP_STATE1', ' path => ', path, ' prevPath => ', prevPath);
            this._onRoute(e.state.path);
        });
    }
    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router([]);
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