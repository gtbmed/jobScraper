// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Require our Sequelize model
const db = require("./models");

// Scraping Tools
var cheerio = require('cheerio');
var request = require('request');

//Initialize Express
const app = express();

//Set the port for online and local use
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Make public a static dir
app.use(express.static("public"));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() { // force: true if you want the table dropped, false if not
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
