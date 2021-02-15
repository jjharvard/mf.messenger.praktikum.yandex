const fs = require('fs');
const path = require('path');

let dir = process.argv[2]

function rename(filepath) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (!data.match(/import .* from/g)) {
            return
        }
        let newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js')
        if (err) throw err;

        fs.writeFile(filepath, newData, function (err) {
            if (err) {
                throw err;
            }
        });
    })
}

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            if(fullPath.endsWith('js')) {
                rename(fullPath)
            }
        }
    });
}

traverseDir(dir);