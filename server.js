const express = require('express');
const { generatekey } = require('./routes/auth');
const { validation } = require('./middleware');

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello There! Welcome..")
});

app.get("/auth", (req, res) => {
   generatekey(req, res);
});

app.use(validation);

app.get("/task", (req, res) => {
    res.send('taks api ');
})

app.listen(5000, console.log("Server running successfully.."));
