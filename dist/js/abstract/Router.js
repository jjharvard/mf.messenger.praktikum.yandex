export class Router {
    constructor(routes) {
        this.routes = routes;
        window.onpopstate = (event) => {
            console.log('pop ', history.length);
            let hash = event.currentTarget.location.hash;
            if (hash) {
                this._onRoute('/' + hash);
            }
            else {
                this.start();
            }
        };
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
    _onRoute(path) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.page.hide();
        }
        this.currentRoute = route;
        this.currentRoute.page.show();
    }
    push(path) {
        window.history.pushState({}, "", path);
        this._onRoute(path);
    }
    replace(path) {
        window.history.replaceState({}, "", path);
        this._onRoute(path);
    }
    back() {
        window.history.back();
    }
    start() {
        if (this.getRoute('/' + window.location.hash)) {
            this._onRoute('/' + window.location.hash);
        }
        else {
            this.replace("/#login");
        }
    }
    getRoute(path) {
        return this.routes.find(route => route.path === path);
    }
}
//# sourceMappingURL=Router.js.map