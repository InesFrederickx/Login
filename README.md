# Login System

This is a simple login/register website. When you succesfully registered, a message will come on your screen to verify that is was succesfull.

When you log in, your data will be stored in the session storage. You can find this when you inspect the page, then go to the Application part. There you click on session storage and go to the right one.

I worked with MongoDB as database for the users.

I put the node_modules too late in the .gitignore so there is no need to run "npm install" since you should already have all the packages needed for this project (cors, dotenv, express, mongodb, uuidv4).

To run the project, type "nodemon index.js".
