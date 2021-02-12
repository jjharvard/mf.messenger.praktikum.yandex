import {Route} from "./Route.js";
import {StateUtil} from "../utils/StateUtil.js";
import {AuthApi} from "../api/AuthApi.js";

export class Router {

    private static instance: Router;

    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router([]);
        }
        return this.instance;
    }

    currentRoute: Route;

    constructor(private routes: Route[]) {
        window.addEventListener('popstate', (e: PopStateEvent) => {
            let prevPath = this.currentRoute.path;
            let path = e.state.path;
            console.log('ON_POP_STATE1', ' path => ', path, ' prevPath => ', prevPath, 'cookie => ', document.cookie);
            if(prevPath === '/chat' && path === '/login') {
                AuthApi.logOut().then(_ => {
                    this._onRoute(e.state.path);
                })
            } else if(prevPath === '/login') {
                if(StateUtil.isAuthenticated()) {
                    this._onRoute(e.state.path);
                } else {
                    history.replaceState({path: '/login'}, '', '/login')
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