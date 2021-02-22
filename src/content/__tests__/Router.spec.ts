import {Router} from '../Router';
import {expect} from 'chai';
import {AuthApi} from '../../api/AuthApi';
import {RequestResult} from '../HTTPTypes';
import {Route} from '../Route';
import {Page} from '../Page';
import {Button} from '../../components/_common/Button';

const jsdom = require('mocha-jsdom');

describe('Router', () => {
    jsdom({
        url: 'http://localhost'
    });

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should attach onpopstate listener', () => {
        Router.getInstance();
        expect(window.onpopstate).to.not.be.null;
    });

    it('should push path to history', () => {
        const route = {path: 'path', page: new Page(new Button('', ''))} as Route;
        const router = Router.getInstance();
        router.routes = [route];
        router.currentRoute = route;
        router.push('path');
        expect(history.state.path).equal('path');
    });

    it('should replace current route', () => {
        const route = {path: 'path', page: new Page(new Button('', ''))} as Route;
        const next = {path: 'next', page: new Page(new Button('', ''))} as Route;
        const router = Router.getInstance();
        router.routes = [route, next];
        router.currentRoute = route;
        router._onRoute('next');
        expect(router.currentRoute.path).equal('next');
    });

    it('should add routes', () => {
        const route = {path: 'path', page: new Page(new Button('', ''))} as Route;
        const next = {path: 'next', page: new Page(new Button('', ''))} as Route;
        const prev = {path: 'prev', page: new Page(new Button('', ''))} as Route;
        const router = Router.getInstance();
        router.routes = [prev];
        router.addRoutes([route, next]);
        expect(router.routes).to.have.all.members([prev, route, next]);
    });

    it('should log out', async () => {
        AuthApi.logOut = () => new Promise<RequestResult>((resolve) => resolve({} as RequestResult));
        const login = {path: 'login', page: new Page(new Button('', ''))} as Route;
        const current = {path: 'current', page: new Page(new Button('', ''))} as Route;
        const router = Router.getInstance();
        router.routes = [login, current];
        router.currentRoute = current;
        await router.logout('login')
            .then(_ => expect(router.currentRoute.path).equal('login'));
    });
});

