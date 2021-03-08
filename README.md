# CSE330
464065
URL: http://ec2-18-191-93-35.us-east-2.compute.amazonaws.com/~andrewhuang/module5/group/Calendar.html <br>
Login Credentials: username: andrewhuang password: password

# Creative Portion

### Feature 1
For the first additional feature, I implemented event categorization. Using the feature, users can categorize new and existing events with categories like "Home", "Work", "Family", etc. These tags can be added when a user is creating a new event or updating an existing one. In addition, using the filter radio buttons on the left-hand column, events can be filtered by their specific categorization.

### Feature 2
For the second creative feature, I implemented feature allowing users to associate a description with their events. For each individual event, users can write down notes about the event (event location, specific event details, event reminders etc.) This feature can be accessed by filling out the text area when creating or updating an element.

### Feature 3
For the third creative improvement, I implemented several features to improve the UI. Firstly, I implemented the ability for users to create new events from clicking the Calendar cells. When users are logged in, they can click on specific cells of the calendar to open the "New Event Form". Once the form opens, it is auto populated with the date of whatever cell the user clicked on. Secondly, using the DOM, I also was able to color code the events to make it easier for the user to tell which category each event is in. The class tags containing the specific background-color are added to the classLists using JavaScript when creating the event objects.  
  
Grading Comments:  
-2 users cannot manipulate events created by other users. There is no server-side check for this when modifying and deleting events.  
-2 code is well formatted and easy to read: used "var" throughout and comments are sparse  
-3 session cookie not http only  
-2 doesn't pass validation (stray start tag nav)  
-1 usability: some events don't appear until after another event is created  
-3.5 creative. Gave 6.5 points for event tags. This would be worth 7.5, but I wasn't able to edit the event tag. Also gave 5 points for the UI improvements. UI wouldn't usually be worth this much but I gave you 5 because there was some technical complexity.
