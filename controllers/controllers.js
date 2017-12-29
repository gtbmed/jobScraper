// Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

// Require our sequelize model
const db = require('../models/');

// Scraping Tools
var cheerio = require('cheerio');
var request = require('request');
const urlPrefix = 'https://www.indeed.com'

// Scrape Route
router.get("/scrape", function(req, res) {
  // Make a request call to grab the HTML body from the site of your choice
  request("https://www.indeed.com/jobs?q=javascript&l=Atlanta,+GA&rbl=Atlanta,+GA&jlid=966e6327a98f7e81&jt=fulltime&explvl=entry_level", function(error, response, html) {

    var $ = cheerio.load(html);

    var result = {};
    // Look for the specified clas
    $('.jobtitle').each(function(i, element) {
      //Grab the Job Title
      result.title = $(element).text();
      // grab the link
      result.link = 'https://www.indeed.com' + $(element).children().attr("href");
      // If I get these working, we'll see about company and description
      //Test to see if it scrapes
      console.log (result); //

    // Go back to the home page
    //res.redirect('/');
    });
  })
});
// Export Router to server.js
module.exports = router;
