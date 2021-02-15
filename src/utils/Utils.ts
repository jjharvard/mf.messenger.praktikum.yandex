import {Component} from "../content/Component";

export class Utils {

    static isRendered = (component: Component) => document.getElementById(component.id) !== null;

}