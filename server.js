const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');

const PORT = process.env.PORT;
const STATIC_FILES_DIR = path.join(__dirname, './dist');

app
    .use(helmet({
        contentSecurityPolicy: false,
    }))
    .use(express.static(STATIC_FILES_DIR), function (req, res, next) {
        let re = /\/[a-z-]+$/;
        if (re.test(req.url)) {
            res.sendFile(path.resolve(STATIC_FILES_DIR, 'index.html'));
        } else {
            next();
        }
    })
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

