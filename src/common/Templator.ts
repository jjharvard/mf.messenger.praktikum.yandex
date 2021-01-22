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

        let re = /(<[a-z]+)/g
        key = re.exec(this.template)
        if(key) {
            this.template = this.replaceAt(this.template, key['index'], key[1].length, `${key[1]} id="${ctx['uuid']}"`)
        }
        return this.template;
    }


     static uuidv4(): string {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 8 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(8);
        });
    }

    replaceAt(str: string, index: number, offset: number, replacement: string) {
        return str.substr(0, index) + replacement + str.substr(index + offset);
    }
}

