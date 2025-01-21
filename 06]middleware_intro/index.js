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

// Sample data array
let list = [
  { id: 1, title: "Morning", detail: "wake up at 7 o'clock" },
  { id: 2, title: "Afternoon", detail: "have lunch at 1 o'clock" },
  { id: 3, title: "Evening", detail: "go for a walk at 6 o'clock" }
];

// Custom middleware to log request details
const middle = (req, res, next) => {
  console.log("Hello, I am middleware");
  console.log(req.body); // Log request body
  next(); // Pass control to the next middleware/route handler
};

// Route to render the homepage with the list
app.get("/", (req, res) => {
  res.render("index", { list });
});

// Route to add a new item to the list
app.post("/addData", middle, (req, res) => {
  req.body.id = list.length + 1; // Assign a new ID to the item
  list.push(req.body); // Add the new item to the list
  res.redirect("/"); // Redirect back to the homepage
});

// Route to delete an item from the list
app.get("/deleteData", (req, res) => {
  // Filter out the item with the specified ID
  list = list.filter(item => item.id != req.query.id);
  res.redirect("/"); // Redirect back to the homepage
});

// Route to render the edit page for a specific item
app.get("/editData", (req, res) => {
  // Find the item with the specified ID
  let data = list.find(item => item.id == req.query.id);
  console.log(data); // Log the item to be edited
  res.render("edit", { data }); // Render the edit page with the item data
});

// Route to update an item in the list
app.post("/updateData", (req, res) => {
  // Update the item with the specified ID
  list.forEach(item => {
    if (item.id == req.body.id) {
      item.title = req.body.title;
      item.detail = req.body.detail;
    }
  });
  res.redirect("/"); // Redirect back to the homepage
});

// Start the server and listen on the specified port
app.listen(port, (err) => {
  if (err) {
    console.log(err); // Log any error
  } else {
    console.log("Server started at port", port);
  }
});
