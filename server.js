const express = require('express');
const session = require('express-session');
const { secret } = require("./config");
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongodb-session')(session);
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();

const sessionDBURI = "mongodb://localhost:27017/sessions";

mongoose
    .connect(sessionDBURI.toString(), {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then((res) => {
        console.log('MongoDB connected.')
    })

const store = new mongoDBStore({
    uri: sessionDBURI,
    collection: "mySessions"
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: secret,
        store: store
    })
);

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else {
        res.redirect("/login");
    }
}

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/dashboard", isAuth, (req, res) => {
    res.render("dashboard");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.redirect("/login")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
        req.session.isAuth = true;
        return res.redirect("/dashboard");
    }

    res.redirect("login");
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    let user = await UserModel.findOne({ email })

    if (user) {
        return res.redirect("/register");
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    user = new UserModel({
        username,
        email,
        password: hashedPwd
    });

    await user.save();

    res.redirect("/login")
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
})

app.listen(5000, console.log("Server running successfully.."));
