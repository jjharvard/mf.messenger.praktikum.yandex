export class Router {
    constructor(routes) {
        this.routes = routes;
        window.onpopstate = (e) => {
            console.log('popstate => ', e.state);
        };
        (function addListener(scope) {
            window.addEventListener('hashchange', function (event) {
                // console.log('history.length => ', window.history.length);
                // console.log('history.state => ', window.history.state);
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
    popAll() {
        for (let i = 0; i < window.history.length; i++) {
            window.history.back();
        }
        window.location.replace('#login');
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