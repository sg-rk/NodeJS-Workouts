const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(`${__dirname}/dataFiles`, "testFile2.txt");

//File creation
// fs.writeFile(filePath, "This is a simple text file.", (err)=>{
//     if(!err) console.log('File created Successfully! ');
//     else console.log('err ', err);
// });

//File read
// fs.readFile(filePath, 'utf-8' ,(err, data)=> {
//     if(!err) console.log(data);
//     else console.log(err);
// })

//File update
// fs.appendFile(filePath, " New contents are updated.", (err) => {
//     if(!err) console.log('File successfully updated!')
//     else console.log(err);
// })

//File rename
// fs.rename(filePath, `${__dirname}/dataFiles/testFile2.txt`, (err) => {
//     if(!err) console.log('File rename has done!');
//     else console.log('err ', err);
// })

//File delete
fs.unlink(filePath, (err) => {
    if(!err) console.log('File deleted!');
    else console.log(err);
});


app.get("/", (req,res)=>{
    res.send("Hello There! Welcome..")
})

app.listen(5000, console.log("Server running successfully.."));
