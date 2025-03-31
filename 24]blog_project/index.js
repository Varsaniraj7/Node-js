const express = require("express");
const port = 1008;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const db = require("./config/db")


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));


app.use("/auth", authRoutes);
app.use("/articles", authMiddleware, articleRoutes);


app.get('/', (req, res) => {
    res.render('index', { user: req.user || null });
  });

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
});