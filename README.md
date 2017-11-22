# jobScraper
Make something to help me find a developer job and by doing so show that I should get the developer job...Jobception

I'm trying to create a scraper that will search job sites using a set of criteria I give and pull the results to my site.  From there I will be able to save the Title and Link to a database (haven't decided on SQL or NoSQL yet).

## Front End
### Search Section
To begin, the plan is to have one section where the scraped jobs appear.  I can click the links and have them open in a separate tab.

The scraped jobs will appear as boxes with a button to save them.  Saving them adds them to the database and displays them in another section on the page.

### Saved Section
The saved section will diplay all saved jobs.  Each job will display as a box with a "delete" and "applied" button.  As before the link can be clicked and take me to the details in a new tab.  The "delete" button will remove the job and the "applied" button will move remove the job from the "Saved" section and put it in a third section called "Applied".

###  Applied Section
A third section where all jobs applied to are displayed.  The boxes in this section should have a delete button which will delete them from the database.

## Back End
### database
I've still deciding on the best way to set up the database.  As of getting to this paragraph, I'm leaning towards MySQL as the idea just came into my head.

| Title  | Link   | Saved   | Applied |
|:------:|:------:|:-------:|:-------:|
| STRING | STRING | BOOLEAN | BOOLEAN |

I can use sequelize to generate each entry with default values of "false" for "Saved" and "Applied".  After "Saved" or "Applied" is changed, the site refreshes and the jobs change sections.

### React
I think it might be a good idea to make this in react as there seem to be a lot of repeating items which could be taken care of with components.


## Status
As always, no battle plan survives initial contact with the enemy.  I expect this to change as I learn new things, experience certain problems, and have sudden epiphanies.
