export class Templator {

    static instance: Templator;

    static REGEXP_KEY = /\{\{(.*?)\}\}/gi;
    static REGEXP_ID = /(<[a-z]+)/g;

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

    compile(ctx: ArrayKeys) {
        let key = null;
        while ((key = Templator.REGEXP_KEY.exec(this.template))) {
            if (key[1]) {
                const tmplKey = key[1].trim();
                const data = ctx[tmplKey];
                let value = <string>data.shift();
                this.template = this.template.replace(new RegExp(key[0], "i"), value);
            }
            Templator.REGEXP_KEY.lastIndex = 0;
        }

        key = Templator.REGEXP_ID.exec(this.template);
        if (key) {
            this.template = this.replaceAt(this.template, key.index, key[1].length, `${key[1]} id="${ctx['uuid']}"`);
        }
        Templator.REGEXP_ID.lastIndex = 0;
        return this.template;
    }

    static uuidv4(): string {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 8 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(8);
        });
    }

    static appendTemplate(constructorName: string, count: number): string {
        let res = '';
        for (let i = 0; i < count; i++) {
            res += constructorName + '\n';
        }
        return res;
    }

    replaceAt(str: string, index: number, offset: number, replacement: string) {
        return str.substr(0, index) + replacement + str.substr(index + offset);
    }
}

