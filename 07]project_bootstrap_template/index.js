// Import required modules
const express = require("express");
const port = 1008;
const path = require("path");

// Initialize the Express app
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware to parse URL-encoded data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));


// Route to render the homepage with the list
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server and listen on the specified port
app.listen(port, (err) => {
  if (err) {
    console.log(err); // Log any error
  } else {
    console.log("Server started at port", port);
  }
});
