require("dotenv").config(); // Load environment variables

const express = require("express");
const port = 1008;
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const cloudinary = require("./config/cloudinary")
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at " + port);
})