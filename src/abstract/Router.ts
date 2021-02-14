import {Route} from "./Route.js";
import {StateUtil} from "../utils/StateUtil.js";
import {AuthApi} from "../api/AuthApi.js";

export class Router {

    private static instance: Router;

    private shouldExit = false;

    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router([]);
        }
        return this.instance;
    }

    currentRoute: Route;

    constructor(private routes: Route[]) {
        window.addEventListener('popstate', (e: PopStateEvent) => {
            if (this.shouldExit) {
                if (e.state.path === '/login' || e.state.path === '/sign') {
                    this.shouldExit = false;
                    this._onRoute(e.state.path);
                } else {
                    history.back();
                }
                return;
            }
            let prevPath = this.currentRoute.path;
            let path = e.state ? e.state.path : '';
            if ((prevPath === '/chat' && path === '/login') || (prevPath === '/chat' && path === '/sign')) { // going back from chat
                AuthApi.logOut().then(_ => {
                    this._onRoute(e.state.path);
                });
            } else if ((prevPath === '/login' && path !== '/sign') || (prevPath === '/sign' && path !== '/login')) { // going forward from login or sign
                if (StateUtil.isAuthenticated()) {
                    this._onRoute(e.state.path);
                } else {
                    history.replaceState({path: prevPath}, '', prevPath);
                }
            } else {
                this._onRoute(e.state.path);
            }
        });
    }

    _onRoute(path: string) {
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

    push(path: string) {
        history.pushState({path}, "", path);
        this._onRoute(path);
    }

    replace(path: string) {
        history.replaceState({path}, "", path);
        this._onRoute(path);
    }

    back() {
        history.back();
    }

    exit() {
        this.shouldExit = true;
        history.back();
    }

    start(path: string) {
        let state = StateUtil.getRouterState();
        if (state && state.length === history.length) {
            this.replace(state.currUri);
        } else {
            this.push(path);
        }
    }

    private getRoute(path: string): Route {
        return this.routes.find(route => route.path === path)!;
    }

    addRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.routes.push(route);
        });
    }
}