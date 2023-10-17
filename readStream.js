console.log('File reading by Streaming.');

const fs = require('fs');

const readStream = fs.createReadStream('output.csv', 'utf-8');

let sum = 0;

readStream.on('data', (chunk)=>{
    const chunkString = chunk;

    for(let ch of chunkString[Symbol.iterator]()){
        if(ch != '\n' && ch != ','){
            sum += parseFloat(ch);
        }
    }
})

readStream.on('end', ()=>{
    console.log('read end', sum);
})