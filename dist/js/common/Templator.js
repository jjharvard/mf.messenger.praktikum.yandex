export class Templator {
    constructor() {
        this.template = '';
    }
    static getInstance() {
        if (!Templator.instance) {
            Templator.instance = new Templator();
        }
        return Templator.instance;
    }
    withTemplate(template) {
        this.template = template;
        return this;
    }
    compile(ctx) {
        let key = null;
        while ((key = Templator.REGEXP.exec(this.template))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = ctx[tmplValue];
                this.template = this.template.replace(new RegExp(key[0], "gi"), data);
            }
        }
        return this.template;
    }
}
Templator.REGEXP = /\{\{(.*?)\}\}/gi;
