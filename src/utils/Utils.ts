import {Component} from '../content/Component';

export class Utils {
    static isRendered = (component: Component) => document.getElementById(component.id) !== null;

    static getTimeNow = (date: Date) => ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds();

    static ellipsize = (str: string = '') => str.length < 16 ? str : str.substring(0, 16) + '...';
}
