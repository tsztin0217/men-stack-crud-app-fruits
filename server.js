//server.js

const dotenv = require("dotenv"); // require package
const express = require("express");
const mongoose = require("mongoose");
// Import the Fruit model
const Fruit = require("./models/fruit.js");

// initialize the express app
const app = express();

dotenv.config(); // Loads the environment variables from .env file


// initialize connection to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
// Mongoose/MongoDB event listener
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// mount middleware functions here
// body parser middleware: this function reads the request body 
// and decodes it into req.body so we can access form data!
app.use(express.urlencoded({ extended: false }));




// GET /  (this is the homes page)
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /fruits/new   (this is to the page with a form we can fill out 
// and submit to add a new fruit to the database)
app.get("/fruits/new", (req, res) => {
  // res.send('This route send the user to a form page');
  // never add trailing slash within render
  res.render("fruits/new.ejs");
});


// POST /fruits
// Path used to receive form submissions
// before we created this, this gave us 
// [Object: null prototype] { name: 'Kiwi' }
// in the terminal instead
app.post("/fruits", async (req, res) => {
  // conditional logic to handle the default
  // behavior of HTML form checkbox fields
  // we do this when we need a boolean
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  // create the data in our database
  await Fruit.create(req.body); // this actually adds to mongo atlas
  // redirect tells the client to navigate to
  // a new URL path/another page
  res.redirect("/fruits/new"); // this is a URL path
});

// GET /fruits index route for fruits - sends a page that lists
// all fruits from the database
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  // console.log(allFruits);
  // res.send("Welcome to the index page!");
  res.render('fruits/index.ejs', {fruits: allFruits}); // created a new key called fruits
});

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});



app.listen(3000, () => {
  console.log("Listening on port 3000");
});


  