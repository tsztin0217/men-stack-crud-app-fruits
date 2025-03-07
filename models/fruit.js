// models/fruit.js

const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// two arguments : name of model and reference to the schema that we're going to base it off of
const Fruit = mongoose.model("Fruit", fruitSchema); // create model

// fruit.js exports the Fruit model
// the Fruit model provides us with full CRUD functionality
// over our fruits collection
// in the fruits-app database
/*
whenever we set up an instance of this schema class, right?
We instantiate it, we give it the config that it needs to know what fields it's supposed to have and so forth. 
Once we expose that and we get access to it, now we have an we basically have a functional object that can say, 
hey, what do you need me to do? How many documents you need me to create, or do you need me to retrieve those documents? 
And so forth.
*/
module.exports = Fruit;
