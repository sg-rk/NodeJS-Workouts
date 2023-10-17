console.log('File writing by Steaming');

const fs = require('fs');

const writeStream = fs.createWriteStream('output.csv', 'utf-8');

for(let i=0; i<1e7; i++){
    const chunck = writeStream.write(`${1}\n`);

    if(!chunck) {
        async() => {
                await Promise((resolve, reject) => {
                writeStream.once('drain', resolve);
            })
        }
    }
}

writeStream.end('');