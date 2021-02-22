import { expect } from 'chai';
import { Component } from "../Component";
const jsdom = require('mocha-jsdom');
let component;
describe("Component", () => {
    jsdom({
        url: "http://localhost"
    });
    class TestComponent extends Component {
        getKeys() {
            return {
                'title': 'Test'
            };
        }
        getTemplate() {
            return `<div class="test">{{title}}</div>`;
        }
    }
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
        let root = document.getElementById("root");
        component = new TestComponent();
        root.innerHTML = component.render();
    });
    it("should be rendered", () => {
        expect(component.isRendered()).equal(true);
    });
    it("should display props", () => {
        let div = component.getDOMView();
        expect(div.textContent).equal('Test');
    });
    it("should merge props", () => {
        let prop = { 'key': ['value1', 'value2'] };
        let arg = { 'key': 'value3' };
        expect(component.merge(prop, arg)['key'])
            .to.has.all.members(['value1', 'value2', 'value3']);
    });
    it("should append uuid to element", () => {
        expect(document.getElementById(component.id)).not.equal(null);
    });
});
//# sourceMappingURL=Component.spec.js.map