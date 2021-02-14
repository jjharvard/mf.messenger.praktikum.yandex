import {Component} from "../abstract/Component.js";

export class Utils {

    static isRendered = (component: Component) => document.getElementById(component.id) !== null;

}