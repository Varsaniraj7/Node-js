const express = require("express");
const port = 1008;
const db = require("./config/db");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

const app = express();

const cookie = require("cookie-parser")

app.set("view engine", "ejs")
app.use(session({
    name: "local",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge:20000 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cookie())
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/", require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})