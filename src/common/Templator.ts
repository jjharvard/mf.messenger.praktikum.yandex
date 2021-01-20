export class Templator {

    static instance: Templator;

    static REGEXP = /\{\{(.*?)\}\}/gi;
    private template: string = '';

    static getInstance() {
        if (!Templator.instance) {
            Templator.instance = new Templator();
        }
        return Templator.instance;
    }

    withTemplate(template: string) {
        this.template = template;
        return this;
    }

    compile(ctx: Props) {
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

