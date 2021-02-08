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

        (function addListener(scope) {
            window.addEventListener('hashchange', function (event: HashChangeEvent) {
                console.log('HashChangeEvent => ', event);
                console.log('oldNew => ', event.oldURL, ' => ', event.newURL);
                console.log('window.location.hash => ', window.location.hash);
                let regex = /#([a-z-]+)/;
                let key = regex.exec(event.newURL);
                if (key) {
                    console.log(key[0]);
                    scope.go(key[0]);
                } else {
                    scope.go("#login");
                }
            });
        })(this);

    }

    addRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.routes.push(route);
        });
    }

    go(path: string) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.page.hide();
        }
        this.currentRoute = route;
        this.currentRoute.page.show();
    }

    replace(path: string) {
        window.location.replace(path);
    }

    back() {
        window.history.back();
    }

    start() {
        if (window.location.hash) {
            this.go(window.location.hash);
        } else {
            this.go("#login");
        }
    }

    private getRoute(path: string): Route {
        return this.routes.find(route => route.path === path)!;
    }

}