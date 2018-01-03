## 12/19/2017

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

## 12/21/2017
MVC Info
https://developer.chrome.com/apps/app_frameworks
^Follow this up with reading on Design Patterns for JS.  Yes there is no one right way to do things, but I'd rather optimize ahead of time.
https://addyosmani.com/resources/essentialjsdesignpatterns/book/
^I feel like this is a good way to follow up the bootcamp.  I'd like to get some best practices into my head so that I can do better faster.  I'd like to have a larger toolkit to work with when problem solving.  Right now it feels like i'm reinventing the wheel all the time.  Let's try starting with a wheel and see what else I can add to it.

## 12/22/2017
Got rid of the routes folder.  After further reading on MVC, I see that controllers is where it belongs.  I want to keep things orderly.  Let's put them there for now and break files up if I need to.

Today's goal:  Convert controllers.js from mongoose to sequelize.

Also, here's the breakdown of a indeed.com url
https://www.indeed.com/jobs?q=javascript&l=Atlanta,+GA&rbl=Atlanta,+GA&jlid=966e6327a98f7e81&jt=fulltime&explvl=entry_level

www.indeed.com/jobs
* ?q = before query term
* &l = before location
* &rbl = before the more specific location
* &jlid followed by long string (GUID?) = appears when the location is selected.  This may have to be hardcoded for locations
* &jt = before job type (fulltime, internship, contract, temporary, parttime, commission)
&explvl = before experience level (entry_level, mid_level, senior_level)

not shown
* &rbc = before company (this comes after &l but before)

### 16:27
Maybe I need to use a routes folder just for the database manipulating routes?  Maybe I should plan out my routes first?

## 12/25/2017
Update link for Cheerio and classes for it to look at and scrape

As part of the conversion to MySQL I'll have to pull out my notes.

## 12/26/2017
Ok, I got MySQL and my app connecting I think.  I tried testing my routes and realized I had not connected them to the server.

In the boot camp I don't think we used a controller until we used Mongoose and MongoDB.  Time to check those notes.
Nevermind, we did.  We also used Handlebars...not my favorite.  I'll incorporate what I started doing for the sequlizedBurger hw.

Ok, I've connected controllers.js and server.js.  Now I'm testing to see if my scrape is pulling the information I want it to.  So far it seems to not be doing anything.  I haven't received any errors.  I'm checking Cheerio to see if I'm putting in my "element" corrrectly.  LinkedIn has a class called "row result clickcard".  I wonder if the spaces are causing trouble.

## 12/27/2017
Ok, I'm not sure why nothing is happening.  I figured nothing would show up on the browser because I haven't told anything to show up.  I thought my console.log would at least show the scraped results, but the browser (http://localhost:3000/scrape) isn't showing anything.   I may have to go back and build things from scratch to see if I can find where the errors are.  I may be trying to piece together to many parts too soon.

Before I do all that, I'm going to make go over CheerioJS again.  Maybe I'm really messing up what I'm looking for?  The only thing I seem to get is "empty response" in the browser.  Time to take a break and let it stew in my brain.

### 20:58
GREAT SUCCESS.  I saw that the class "jobtitle" was pretty unique and had the desired info in the div.  I changed my cheerio scrape to

    $('.jobtitle').each(function(i, element) {
      //Grab the Job Title
      result.title = $(element).text();

The titles on the first page have been grabbed.  I will try to add each in the order of importance "link", "company", "description", "salary".

Maybe I will change the DevDiary to a .md file so my notes are better displayed.

Also helpful:  https://scotch.io/tutorials/scraping-the-web-with-node-js

## 12/29/2017
Converted DevDiary to .md file.  Discovered that the 3 back-tick method of code highlighting seems to be broken for Atom for javaScript.  I really should get moving over to VS Code.

So I was trying to scrape the link and came back with an incomplete URL.
"/rc/clk?jk=c78e9a421d68927d&fccid=70ffea20507501b6"

After inspecting, I saw that the full URL is
https://www.indeed.com/rc/clk?jk=c78e9a421d68927d&fccid=70ffea20507501b6

This redirects to the following site
https://www.indeed.com/viewjob?jk=c78e9a421d68927d&q=javascript&l=Atlanta,+GA&tk=1c2i2mbm6518lb1u&from=web

I'll solve this problem by scraping the incomplete code as the URL and append it to "https://www.indeed.com".  This complete URL will go into the object.

### 16:52 Problem With Sponsored Posts
So, the appending works.  I also discovered that the "sponsored" posts don't have the same structure as the regular posts.  Sponsored posts have the following structure:
```html
<div class="row result clickcard" id="pj_c9061d865d2b4cae" data-jk="c9061d865d2b4cae" data-advn="576699342925480">
            <a target="_blank" id="sja1" data-tn-element="jobTitle" class="jobtitle turnstileLink" href="/viewjob?jk=c9061d865d2b4cae&amp;from=tp-serp&amp;tk=1c2i2mbm6518lb1u" title="Web Architect" rel="noopener nofollow" onmousedown="sjomd('sja1'); clk('sja1');" onclick="setRefineByCookie(['jobtype', 'loc', 'explvl']); sjoc('sja1',0); convCtr('SJ')">Web Architect</a>

```
Regular posts have the following structure
```html
<div class="row result clickcard" id="p_c78e9a421d68927d" data-jk="c78e9a421d68927d" data-tn-component="organicJob">
<h2 id="jl_c78e9a421d68927d" class="jobtitle">
    <a href="/rc/clk?jk=c78e9a421d68927d&amp;fccid=70ffea20507501b6" target="_blank" rel="noopener nofollow" onmousedown="return rclk(this,jobmap[1],0);" onclick="setRefineByCookie(['jobtype', 'loc', 'explvl']); return rclk(this,jobmap[1],true,0);" title="Web Development Teaching Assistant" class="turnstileLink" data-tn-element="jobTitle">Web Development Teaching Assistant</a>
    </h2>
```

The class "jobTitle" appears at different levels in each.  In the sponsored posts, it shows up in the same tag as the link.  In the regular posts, it is a level above the link.  The current scrape structure returns 'undefined' for the sponsored posts.

#### Possible Solutions
1. We could make a condition that checks to see if the desired link is "undefined" and if so, proceed along a different set of instructions for the scrape for sponsored posts.
2. We have the scrape check for different criteria such as the element "[data-tn-component='organicJob']".
3. Could I do another scrape at the same time?  Run one scrape for all regular posts using more specific references unique to regular posts and another for sponsored?

This could be of some use.
https://www.w3schools.com/jquery/jquery_ref_selectors.asp


#### Trying out Solutions
1. Not tested yet.
2. Tested, it works.  Not sure what we'll do about the sponsored jobs at this time.
3. Not tested yet.

## 1/2/2017
Going to try out adding another scrape immediately after the scrape for regular posts and see if that gets the sponsored posts.

It's alive!!!! Ok, so all I needed to do was add another command below the first one.

    $('[data-advn]').each(function(i, element) {
      //Grab the Job Title
      result.title = $(element).children().attr('title');
      // grab the link
      console.log (result); //
Now to get the links.

I only added the link grab for the regular posts at first and figured that when the scrape happened, the sponsored posts would only have titles.  The scrape didn't like that so it copied the link to the last regular job post to each of the sponsored posts.

I'm going over my scrape again to make sure it grabbed everything.  Something looks weird.

### 19:17
Just confirmed that I'm scraping posts that don't match what I see on the site when I load the url into my browser.  Wat?

Interestingly enough, Indeed uses a default URL prefix
```html
['basicPermaLink'] = "https://www.indeed.com";
```

### 20:18
Just spoke with Andy and the problem may stem from me not having any user-agent headers.  Time to research those and how I use them with Cheerio my scrape.  Bleh.  
