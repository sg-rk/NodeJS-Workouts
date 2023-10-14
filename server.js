const express = require('express');
const session = require('express-session');
const { secret } = require("./config");
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const sessionDBURI = "mongodb://localhost:27017/sessions";

mongoose
    .connect(sessionDBURI.toString(), {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then((res)=>{
        console.log('MongoDB connected.')
    })

const store = new mongoDBStore({
                    uri: sessionDBURI,
                    collection: "mySessions"
                });

app
    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: secret,
        store: store
    }));

app
    .get("/", (req,res)=>{
        req.session.isAuth = true;
        console.log(`session `,req.sessionID);
        res.send("Hello There! Welcome..")
    })

app
    .listen(5000, console.log("Server running successfully.."));
