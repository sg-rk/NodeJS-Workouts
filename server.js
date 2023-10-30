const http = require('http');
const urlModule = require('url');

let dataStore = [
    {
        id: 1,
        title: 'Palm'
    },
    {
        id: 2,
        title: 'Taxation'
    }
]

http.createServer((req, res) => {
    const { method } = req;
    const url = urlModule.parse(req.url, true);
    console.log(url);
    req.on('error', (err) => {
        console.error('error ', err);
        res.statusCode = 400;
    });

    res.on('error', (err) => {
        console.error(err);
    })

    if (url.pathname == '/') {
        res.statusCode = 200;
        res.end('Hello world!');
    }
    else if (!url || !url.pathname) {
        apiNotFound(req, res);
    }
    else {
        switch (method) {
            case "GET":
                switch (url.pathname) {
                    case "/echo":
                        echoFunction(req, res);
                        break;
                    case "/projects":
                        fetchProject(req, res, url);
                        break;
                    default:
                        apiNotFound(req, res);
                        break;
                }
                break;
            case "POST":
                switch (url.pathname) {
                    case "/projects":
                        saveProject(req, res);
                        break;
                    case "/projects/delete":
                        deleteProject(req, res, url);
                        break;
                    case "/projects/update":
                        updateProject(req, res, url);
                        break;
                    default:
                        apiNotFound(req, res);
                        break;
                }
                break;
            default:
                apiNotFound(req, res);
                break;
        }
    }
}).listen(5000);

const apiNotFound = (req, res) => {
    res.statusCode = 404;
    res.end('API not found!')
}

const recordNotFound = (res) => {
    res.statusCode = 404;
    res.write('Record not found!')
}

const writeContent = (res, statusCode, content) => {
    res.statusCode = statusCode;
    res.write(content);
}

const echoFunction = (req, res) => {
    let body = [];
    req
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body);
            res
                .on('error', err => {
                    console.log(err);
                })
            res.statusCode = 201;
            res.write(body);
            res.end();
        });
}

const saveProject = (req, res) => {
    let body = [];
    req
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            let isExists = false;
            for (let d of dataStore) {
                if (body.id == d.id) {
                    isExists = true;
                    break;
                }
            }

            if (isExists) {
                writeContent(res, 302, 'Record already exists!');
            }
            else {
                dataStore.push(body);
                writeContent(res, 201, 'Data saved successfully!');
            }
            console.log(dataStore);
            res.end();
        })
};

const fetchProject = (req, res, url) => {
    if (!!url.query && !!url.query.id) {
        let data = null;
        for (let d of dataStore) {
            if (url.query.id == d.id) {
                data = JSON.stringify(d);
                break;
            }
        }
        if (!!data) {
            writeContent(res, 200, data);
        }
        else {
            recordNotFound(res);
        }
    }
    else {
        if (url.query.id == '') {
            writeContent(res, 400, 'Invalid params!');
        }
        else {
            writeContent(res, 200, JSON.stringify(dataStore));
        }
    }
    res.end();
}

const deleteProject = (req, res, url) => {
    if (url.query && url.query.id) {
        let isDeleted = false;
        for (let [i, d] of dataStore.entries()) {
            if (url.query.id == d.id) {
                dataStore.splice(i, 1);
                isDeleted = true;
                break;
            }
        }

        if (isDeleted) {
            writeContent(res, 200, 'Record delete!');
        } else {
            recordNotFound(res);
        }
        res.end();
    }
    else {
        recordNotFound(res);
    }
    res.end();
}

const updateProject = (req, res, url) => {
    if (url.query && url.query.id) {
        let body = [];
        req
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                let isUpdated = false;
                for (let [i, d] of dataStore.entries()) {
                    if (url.query.id == d.id) {
                        dataStore[i] = body;
                        isUpdated = true;
                        break;
                    }
                }
                if (isUpdated) {
                    writeContent(res, 200,
                        `Record updated! \n${JSON.stringify(body)} `);

                } else {
                    recordNotFound(res);
                }
                res.end();
            });
    }
    else {
        recordNotFound(res);
        res.end();
    }
}
