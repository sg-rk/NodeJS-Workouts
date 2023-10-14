const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello There! Welcome..")
})

app.listen(5000, console.log("Server running successfully.."));
