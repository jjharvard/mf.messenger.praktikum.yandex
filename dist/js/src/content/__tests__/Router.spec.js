import { Router } from "../Router.js";
import { expect } from 'chai.js';
import { AuthApi } from "../../api/AuthApi.js";
import { Page } from "../Page.js";
import { Button } from "../../components/_common/Button.js";
const jsdom = require('mocha-jsdom');
describe("Router", () => {
    jsdom({
        url: "http://localhost"
    });
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });
    it("should attach onpopstate listener", () => {
        Router.getInstance();
        expect(window.onpopstate).to.not.be.null;
    });
    it("should push path to history", () => {
        let route = { path: 'path', page: new Page(new Button('', '')) };
        let router = Router.getInstance();
        router.routes = [route];
        router.currentRoute = route;
        router.push('path');
        expect(history.state.path).equal('path');
    });
    it("should replace current route", () => {
        let route = { path: 'path', page: new Page(new Button('', '')) };
        let next = { path: 'next', page: new Page(new Button('', '')) };
        let router = Router.getInstance();
        router.routes = [route, next];
        router.currentRoute = route;
        router._onRoute('next');
        expect(router.currentRoute.path).equal('next');
    });
    it("should add routes", () => {
        let route = { path: 'path', page: new Page(new Button('', '')) };
        let next = { path: 'next', page: new Page(new Button('', '')) };
        let prev = { path: 'prev', page: new Page(new Button('', '')) };
        let router = Router.getInstance();
        router.routes = [prev];
        router.addRoutes([route, next]);
        expect(router.routes).to.have.all.members([prev, route, next]);
    });
    it("should log out", async () => {
        AuthApi.logOut = () => new Promise((resolve) => resolve({}));
        let login = { path: 'login', page: new Page(new Button('', '')) };
        let current = { path: 'current', page: new Page(new Button('', '')) };
        let router = Router.getInstance();
        router.routes = [login, current];
        router.currentRoute = current;
        await router.logout('login')
            .then(_ => expect(router.currentRoute.path).equal('login'));
    });
});
//# sourceMappingURL=Router.spec.js.map