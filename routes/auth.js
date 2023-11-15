const shortid = require('shortid');
const fs = require('fs');
const os = require('os');

const VALUE_KEY_FILE = `${__dirname}/../value_key.txt`;

const generatekey = (req, res) => {        
    let skey = shortid.generate();

    try{
        fs.appendFile(VALUE_KEY_FILE, `${skey}\r\n`, {
            encoding: 'utf8'            
        }, (err) => {
            if(err) throw err;
            else{
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify({apiKey: skey}));        
            }
        })
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = { generatekey };