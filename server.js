const express = require('express');
const session = require('express-session');
const { secret, token_name } = require("./config");
const mongoose = require('mongoose');
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
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

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const isAuth = (req, res, next) => {
    const token = req.cookies[token_name];
    let verified = false;
    if(token){
        try{
            verified = jwt.verify(token, secret);
            if(verified){
                req.user = verified;
                next();
            };    
        }
        catch(err){
            res.redirect("/login")
        };
    }
    else{
        console.log("rk ", token, verified);
        return res.clearCookie(token_name).redirect("login");
    }
}

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/dashboard", isAuth, (req, res) => {
    res.render("dashboard");
});

app.get("/login", (req, res) => {
    res.clearCookie(token_name);
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
        const token = jwt.sign({email, password}, secret, {expiresIn: "1m"});
        res.cookie(token_name, token, {
            httpOnly: true
        })
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
    res.clearCookie(token_name);
    return res.redirect("/");
})

app.listen(5000, console.log("Server running successfully.."));
