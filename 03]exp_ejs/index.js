// Import the Express library
const express = require("express");

// Define the port where the server will listen
const port = 1008;

// Initialize an Express application
const app = express();

// Set the view engine to EJS for rendering templates
app.set("view engine", "ejs");

// Middleware to parse URL-encoded data (used for handling form submissions)
app.use(express.urlencoded({ extended: true }));

// Array to hold student data
let students = [
    { id: 1, name: "raj", city: "rajkot" },
    { id: 2, name: "jay", city: "morbi" },
    { id: 3, name: "harsh", city: "jamnagar" },
];

// Route to render the home page
// The `students` array is passed to the "index" EJS template to be displayed
app.get("/", (req, res) => {
    res.render("index", { students });
});

// Route to handle form submissions for adding a new student
app.post("/addData", (req, res) => {
    // Assign a new unique ID based on the current length of the students array
    req.body.id = students.length + 1;

    // Add the new student to the `students` array
    students.push(req.body);

    // Redirect back to the home page after adding the student
    res.redirect("/");
});

// Route to handle deleting a student by ID
app.get("/deleteData", (req, res) => {
    // Filter out the student with the specified ID
    let studentData = students.filter((item) => item.id != req.query.id);

    // Update the `students` array with the remaining students
    students = studentData;

    // Redirect to the homepage after deletion
    res.redirect("/");
});

// Route to render the edit page for a specific student
app.get("/updateData/:id", (req, res) => {
    // Find the student with the matching ID from the array
    let data = students.find(item => item.id == req.params.id);

    // Render the "edit" EJS template with the found student's data
    res.render("edit", { data });
});

// Route to handle the update operation for a student's data
app.post("/editData", (req, res) => {
    // Loop through the students array to find the student to be updated
    students.forEach(item => {
        if (item.id == req.body.id) {
            // Update the student's name and city if the ID matches
            item.name = req.body.name;
            item.city = req.body.city;
        }
    });

    // Redirect to the homepage after editing
    res.redirect("/");
});

// Start the server and listen on the specified port
app.listen(port, (err) => {
    // Log an error if it occurs; otherwise, confirm the server is running
    err ? console.log(err) : console.log("Server started at port:", port);
});
