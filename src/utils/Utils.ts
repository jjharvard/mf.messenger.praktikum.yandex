import {Component} from "../_std/Component.js";

export class Utils {

    static isRendered = (component: Component) => document.getElementById(component.id) !== null;

}