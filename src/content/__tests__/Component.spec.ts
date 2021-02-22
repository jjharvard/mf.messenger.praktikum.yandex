import {expect} from 'chai';
import {Component} from '../Component';

const jsdom = require('mocha-jsdom');
let component: Component;

describe('Component', () => {
    jsdom({
        url: 'http://localhost'
    });

    class TestComponent extends Component {
        getKeys(): Keys {
            return {
                'title': 'Test'
            };
        }

        getTemplate(): string {
            return `<div class="test">{{title}}</div>`;
        }
    }

    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        const root = document.getElementById('root');
        component = new TestComponent();
        root!.innerHTML = component.render();
    });

    it('should be rendered', () => {
        expect(component.isRendered()).equal(true);
    });

    it('should display props', () => {
        const div = <HTMLDivElement>component.getDOMView();
        expect(div.textContent).equal('Test');
    });

    it('should merge props', () => {
        const prop = {'key': ['value1', 'value2']} as ArrayKeys;
        const arg = {'key': 'value3'};
        expect(component.merge(prop, arg)['key'])
            .to.has.all.members(['value1', 'value2', 'value3']);
    });

    it('should append uuid to element', () => {
        expect(document.getElementById(component.id)).not.equal(null);
    });
});
