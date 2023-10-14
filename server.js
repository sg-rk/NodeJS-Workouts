const express = require('express');
const session = require('express-session');
const app = express();
const { secret } = require("./config");

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: secret
}));

app.get("/", (req,res)=>{
    req.session.isAuth = true;
    console.log(`session `,req.sessionID);
    res.send("Hello There! Welcome..")
})

app.listen(5000, console.log("Server running successfully.."));
