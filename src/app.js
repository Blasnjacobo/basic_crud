//THIS FILE WOULD BE EXECUTING THE SERVER

/*
npm init --yes. used in the terminal to create a Json Package.
We are installing the following modules:
express: It is a framework to reduce code, in charge of HTTP protocol,
mysql: Database that enables us to connect to a server,
express-myconnection: Link mysql with express,
morgan: Display the request to the server, 
ejs: Send html files before being processed by servers,
so, this is the line of code typed in the terminal to install all these modules: 
npm instal express mysql express-myconnection morgan ejs
*/

// Express is a minimal and flexible Node js web application framework that provides a robust set of features for web applications.
const express = require ("express");
//path module link directories
const path = require("path");
//Display request from clientes
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
//Importing routes
const customerRoutes = require("./routes/customer");

//We will set express(port, views,etc)  //Process.env.Port checks if there a Port in the operating system isf not it is set to 3000

//Settings
const app = express();
app.set("port", process.env.Port || 3000); // Installing nodemon to restart the server at every code change, npm install nodemon -D
/* The listen function is typically used by servers that can have more than one connection request at a time. 
If a connection request arrives and the queue is full, the client will receive an error */
app.listen (app.get("port"), () => {
    console.log("Server on port 3000")
})
//The view folder will be in charge for storing all files from templates engines (motores de plantillas)
//In this case we are using a ejs view engine, once is set express recognizes this is ejs
app.set("view engine", "ejs");

//We have to set the path for views using path
//_dirname sets the path from operating system to the file, and we will call it: views
//this line says: set views folder under current path
app.set("views", path.join(__dirname, "views"));

//Middlewares: functions that are executed before users requested
app.use(morgan("dev")); // After refreshing the website we are getting: GET / 304 18.089 ms - -
app.use(myConnection(mysql,{
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "crudnodejsmysql"
}, "single")) //How we are getting conected to the server: single

//With this express module the server will transform the data from the website into something it can undestand
//extended is false because we dont want any unencripted unnecessary data
app.use(express.urlencoded({extended:false}))

/*
---------------------------------------------------------------------------------------------------------------------------------------
NOW THAT WE HAVE EVERYTHING SET UP ALREADY WE HAVE TO INITIALIZE mysql using: mysql -u root -p
--------------------------------------------------------------------------------------------------------------------------------------- 
*/

//Routers: Users request /products for example
app.use("/", customerRoutes);

// static files (css and extra files)
app.use(express.static(path.join(__dirname,"public")))


/*We can check at package.json dependencies the modules versions for each
Type at the terminal  node src/app.js for displaying the server on port 3000 message
Then we veryfy browsering at localhost:3000, there is an error but we do actually have a response from express
If we want to change something in our files, we have to stop the server, do the changes and start running the server again 
For that reason we install modemon, this module restarts the server automatically everytime that there is a change, so inte terminal npm install nodemon -D
We use -D because this module is not stored at package dependencies because it is not necesary for this project, modemon is not, so it goes to dev dependecies section at 
From now on instead of typing node src/app.js we use nodemon src/app.js
We type nodemon scr/app.js in the terminal and shows an error becasue nodemon is installed just just our project and not globally
so, we move nodemon from dev dependencies to scripts (by hand)
we replace  "test": "echo \"Error: no test specified\" && exit 1" for  "dev": "nodemon src/app.js"
We check in the terminal it is it now working with npm run dev
Everytime we modifying the file and save it we can see in the terminal that the server is been restarted automatically*/



//IF I WOULD LIKE TO RUN THE SERVER I HAVE TO MAKE SURE I AM AT THE RIGHT PATH AND THEN TYPE npm run dev




