export class Router {
    constructor(routes) {
        this.routes = routes;
        // window.onpopstate = (event: PopStateEvent) => {
        //     console.log('PopStateEvent => ', event);
        // };
        (function addListener(scope) {
            window.addEventListener('hashchange', function (event) {
                console.log('HashChangeEvent => ', event);
                console.log('oldNew => ', event.oldURL, ' => ', event.newURL);
                console.log('window.location.hash => ', window.location.hash);
                let regex = /#([a-z-]+)/;
                let key = regex.exec(event.newURL);
                if (key) {
                    console.log(key[0]);
                    scope.go(key[0]);
                }
                else {
                    scope.go("#login");
                }
            });
        })(this);
    }
    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router([]);
        }
        return this.instance;
    }
    addRoutes(routes) {
        routes.forEach(route => {
            this.routes.push(route);
        });
    }
    go(path) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.page.hide();
        }
        this.currentRoute = route;
        this.currentRoute.page.show();
    }
    replace(path) {
        window.location.replace(path);
    }
    back() {
        window.history.back();
    }
    start() {
        if (window.location.hash) {
            this.go(window.location.hash);
        }
        else {
            this.go("#login");
        }
    }
    getRoute(path) {
        return this.routes.find(route => route.path === path);
    }
}
//# sourceMappingURL=Router.js.map