const express = require("express");
const port = 1008;
const path = require("path");
const db = require("./config/db")
const app = express();
const cookie = require("cookie-parser")
const passport = require("passport");
const session = require("express-session");

app.set("view engine", "ejs");

app.use(session({
    name: "local",
    secret: 'rwr',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100*100*60 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cookie())
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})