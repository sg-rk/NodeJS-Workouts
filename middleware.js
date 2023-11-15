const fs = require('fs');
const VALUE_KEY_FILE = `${__dirname}/value_key.txt`;

module.exports = {
    validation : (req, res, next) => {
        let xApiKey = req.headers['x-api-key'];

        fs.open(VALUE_KEY_FILE, (err, fd) => {
            if(err) throw err;

            fs.readFile(fd, 'utf8', (err, data) => {
                if(err) throw err;
                if(data.includes(xApiKey)){                
                    console.log('Authorized');
                    next();
                }
                else{
                    res.writeHead(404);
                    res.end('Not authorized');
                }
            });
        })
    }
}