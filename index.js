// Importing the Required Modules
const mysql = require('mysql');
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')


// Creating the Express Server
const app = express()
const port = 8000 // Setting the Port

// Setting up the Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);


// Setting up the Database Connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'appuser',
    password: 'app2027',
    database: 'myBookshop'
});

// Connecting to the Database
db.connect((err) => {
    if (err) {
        throw err;
    };
    console.log('Connected to Database\n');
});
global.db = db; // Making the Database Connection Global


// Setting up the Routes & Constants
const shopData = { shopName: "Bertie's Books" }
require('./routes/main')(app, shopData);


// Starting the Server
app.listen(port, () => {
    console.log(`App Listening on Port ${port}`)
});
