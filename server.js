const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const STATIC_FILES_DIR = path.join(__dirname, './dist');

app
    .use(express.static(STATIC_FILES_DIR), function (req, res, next) {
        let re = /\/js\//
        if(re.test(req.url)) {
            res.redirect(req.url + '.js')
        } else {
            next();
        }
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

