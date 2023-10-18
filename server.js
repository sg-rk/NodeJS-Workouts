const express = require('express');
const app = express();

app.set("view engine", ".ejs");
app.use(express.static('public'));
app.get("/", (req,res)=>{
    res.render("picture-in-css.ejs");
})

app.listen(5000, console.log("Server running successfully.."));
