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

http.createServer((req, res)=>{
    const {headers, method} = req;
    const url = urlModule.parse(req.url, true);

    let body = [];

    req.on('error', (err)=>{
        console.error('rk ', err);
        res.statusCode = 400;
    });

    res.on('error', (err)=>{
        console.error(err);
    })
    
    if(method == 'GET'){
        switch (url.pathname) {
            case "/echo":
                echoFunction(req, res, body);
                break;
            case "/projects":
                fetchProject(req, res, url);
                break;
            default:
                apiNotFound(req, res);
                break;
        }
    }
    else if(method == "POST"){
        switch (url.pathname) {
            case "/projects":                
                saveProject(req, res, body);
                break;        
            default:
                apiNotFound(req, res);
                break;
        }
    }
    else if( url.pathname == '/'){
        res.statusCode = 200;
        res.end('Server running!');
    }
    else {
        apiNotFound(req, res);
    }
}).listen(5000);

const apiNotFound = (req, res) => {
    res.statusCode = 404;
    res.end('API not found!')
}

const echoFunction = (req, res, body) => {
    req
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', ()=>{
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

const saveProject = (req, res, body) => {
    req
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            let isExists = false;
            for(let d of dataStore){
                if(body.id == d.id){
                    isExists = true;
                    break;
                }
            }

            if(isExists){
                res.statusCode = 302;
                res.write('Record already exists!');
            }
            else {
                dataStore.push(body);                    
                res.statusCode = 201;
                res.write('Data saved successfully!')
            }
            console.log(dataStore);
            res.end();
        })
};

const fetchProject = (req, res, url) => {
    if(url.query && url.query.id){
        for(let d of dataStore){
            if(url.query.id == d.id){
                res.write(JSON.stringify(d));
                break;
            }
        }
    }
    else {
        res.write(JSON.stringify(dataStore));
    }
    res.statusCode = 200;
    res.end();
}
