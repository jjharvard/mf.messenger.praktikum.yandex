import {Route} from "./Route.js";

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

        window.onpopstate = (event: PopStateEvent) => {
            let hash = (event.currentTarget as Window).location.hash;
            if (hash) {
                this._onRoute('/' + hash);
            } else {
                this.start();
            }
        };

    }

    addRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.routes.push(route);
        });
    }

    _onRoute(path: string) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.page.hide();
        }
        this.currentRoute = route;
        this.currentRoute.page.show();
    }

    push(path: string) {
        window.history.pushState({}, "", path);
        this._onRoute(path);
    }

    replace(path: string) {
        window.history.replaceState({}, "", path);
        this._onRoute(path);
    }

    back() {
        window.history.back();
    }

    start() {
        if (this.getRoute('/' + window.location.hash)) {
            this._onRoute('/' + window.location.hash);
        } else {
            this.replace("/#login");
        }
    }

    private getRoute(path: string): Route {
        return this.routes.find(route => route.path === path)!;
    }

}