export class Templator {
    static getData(obj, path) {
        return obj[path];
    }
    static compile(template) {
        let re = /\{\{(.*?)\}\}/g;
        return (ctx) => {
            let key = null;
            while ((key = Templator.REGEXP.exec(template))) {
                if (key[1]) {
                    const tmplValue = key[1].trim();
                    const data = this.getData(ctx, tmplValue);
                    template = template.replace(new RegExp(key[0], "gi"), data);
                }
            }
            return template;
        };
    }
}
Templator.REGEXP = /\{\{(.*?)\}\}/gi;
