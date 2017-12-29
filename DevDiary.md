##H2 12/19/2017

So I thought I'd start a diary with what I'm doing or thinking on this project.  Maybe it will help me get my thoughts organized.  Maybe if someone stumbles across this and has ideas, they can message me or make an issue?

Anyway, going back to the old sequelize stuff I'd learned, I saw that my server.js should be much less complicated than it was.  I just need to clarify whether the bodyParser.urlencoded extended property should be true or false.  Review time.

Controllers
1. What is there is what I took from the newscraping assignment we had to do.  I'm going to have to go through and make sure this works with sequelize and MySQL instead of Mongoose and MongoDB.
2. Check my MVC notes and see about the best practice for structure.
3. Decide on routes and at least make skeleton of them.

  To Do:
  1. Convert from Mongoose to Sequelize structure
  2. Get URL information from Indeed.com.  Keep it basic for now.  Hard code for location, level, full-time.
  3. Change information for Cheerio scraping to match Indeed.com search results

Models
1.  It's a pretty simple model.  Changing the booleans should impact what get's displayed in what location on the page.
Side Note: Adam at Kabbage told me about how MongoDB apparently drops 30% of it's data.  I'll have to check if I remember that correctly.  I remember 30% and losing.

To Do:
 None at this time.

Public
Front end will be last.  See README for current plan.  Adjustments will be made after I start working on it or have strokes of genius...or stupidity that works. (I'm fine with either).

Routes
Am I supposed to do routes here or in "Controllers".
  To Do:
    1. Review MVC and best practices
    2. If Routes folder is correct, make them there

##H2 12/21/2017
MVC Info
https://developer.chrome.com/apps/app_frameworks
^Follow this up with reading on Design Patterns for JS.  Yes there is no one right way to do things, but I'd rather optimize ahead of time.
https://addyosmani.com/resources/essentialjsdesignpatterns/book/
^I feel like this is a good way to follow up the bootcamp.  I'd like to get some best practices into my head so that I can do better faster.  I'd like to have a larger toolkit to work with when problem solving.  Right now it feels like i'm reinventing the wheel all the time.  Let's try starting with a wheel and see what else I can add to it.

##H2 12/22/2017
Got rid of the routes folder.  After further reading on MVC, I see that controllers is where it belongs.  I want to keep things orderly.  Let's put them there for now and break files up if I need to.

Today's goal:  Convert controllers.js from mongoose to sequelize.

Also, here's the breakdown of a indeed.com url
https://www.indeed.com/jobs?q=javascript&l=Atlanta,+GA&rbl=Atlanta,+GA&jlid=966e6327a98f7e81&jt=fulltime&explvl=entry_level

www.indeed.com/jobs
?q = before query term
&l = before location
&rbl = before the more specific location
&jlid followed by long string (GUID?) = appears when the location is selected.  This may have to be hardcoded for locations
&jt = before job type (fulltime, internship, contract, temporary, parttime, commission)
&explvl = before experience level (entry_level, mid_level, senior_level)

not shown
&rbc = before company (this comes after &l but before)

16:27
Maybe I need to use a routes folder just for the database manipulating routes?  Maybe I should plan out my routes first?

##H2 12/25/2017
Update link for Cheerio and classes for it to look at and scrape

As part of the conversion to MySQL I'll have to pull out my notes.

##H2 12/26/2017
Ok, I got MySQL and my app connecting I think.  I tried testing my routes and realized I had not connected them to the server.

In the boot camp I don't think we used a controller until we used Mongoose and MongoDB.  Time to check those notes.
Nevermind, we did.  We also used Handlebars...not my favorite.  I'll incorporate what I started doing for the sequlizedBurger hw.

Ok, I've connected controllers.js and server.js.  Now I'm testing to see if my scrape is pulling the information I want it to.  So far it seems to not be doing anything.  I haven't received any errors.  I'm checking Cheerio to see if I'm putting in my "element" corrrectly.  LinkedIn has a class called "row result clickcard".  I wonder if the spaces are causing trouble.

##H2 12/27/2017
Ok, I'm not sure why nothing is happening.  I figured nothing would show up on the browser because I haven't told anything to show up.  I thought my console.log would at least show the scraped results, but the browser (http://localhost:3000/scrape) isn't showing anything.   I may have to go back and build things from scratch to see if I can find where the errors are.  I may be trying to piece together to many parts too soon.

Before I do all that, I'm going to make go over CheerioJS again.  Maybe I'm really messing up what I'm looking for?  The only thing I seem to get is "empty response" in the browser.  Time to take a break and let it stew in my brain.

20:58
GREAT SUCCESS.  I saw that the class "jobtitle" was pretty unique and had the desired info in the div.  I changed my cheerio scrape to

    $('.jobtitle').each(function(i, element) {
      //Grab the Job Title
      result.title = $(element).text();

The titles on the first page have been grabbed.  I will try to add each in the order of importance "link", "company", "description", "salary".

Maybe I will change the DevDiary to a .md file so my notes are better displayed.

Also helpful:  https://scotch.io/tutorials/scraping-the-web-with-node-js

##H2 12/29/2017
Converted DevDiary to .md file.  Discovered that the 3 back-tick method of code highlighting seems to be broken for Atom.  I really should get moving over to VS Code.