export class Templator {

    static REGEXP = /\{\{(.*?)\}\}/gi;

    static getData(obj: Object, path: string): string {
        return obj[path];
    }

    static compile(template): (ctx: any) => string {
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