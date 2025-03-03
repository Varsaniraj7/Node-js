const express = require("express");
const port = 1008;
const db = require("./config/db");
const path = require("path");
const passport = require("passport");
const passportSt = require("./middleware/passport")
const session = require("express-session");
// const flash = require("connect-flash")

const app = express();

const cookie = require("cookie-parser")

app.set("view engine", "ejs")
app.use(session({
    name: "local",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge:100*100*60 }
}))
// app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.AuthenticatedUser);

app.use(cookie())
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/", require("./routes/route"))
app.use("/category",require("./routes/category"))
app.use("/subCategory",require("./routes/subCategory"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})