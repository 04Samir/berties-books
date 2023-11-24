// Define Routes for the Express Server
module.exports = function (app, shopData) {

    // Home Page Route
    app.get('/', function (req, res) {
        res.render('index.ejs', shopData); // Rendering the index.ejs Page
    });

    // About Page Route
    app.get('/about', function (req, res) {
        res.render('about.ejs', shopData); // Rendering the about.ejs Page
    });

    // Add Book Page Route
    app.get('/addbook', function (req, res) {
        res.render('addBook.ejs', shopData); // Rendering the addBook.ejs Page
    });

    // Book-Added Page Route
    app.post('/bookadded', function (req, res) {
        // Define the SQL Query
        let sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
        let newrecord = [req.body.name, req.body.price];

        // Execute the SQL Query
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) { // If an Error has Occurred
                return console.error(err.message); // Display the Error Message
            }
            else { // If the Query is Executed Successfully
                // Send a Response Message
                res.send(`This book is added to database, name: ${req.body.name} price ${req.body.price}`);
            };
        });
    });

    // Bargain Books Page Route
    app.get('/bargainbooks', function (req, res) {
        // Define the SQL Query
        let sqlquery = "SELECT * FROM books WHERE price < 20";
        db.query(sqlquery, (err, result) => {
            if (err) { // If an Error has Occurred
                res.redirect('./'); // Redirect to the Home Page
            } else { // If the Query is Executed Successfully
                // Render the bargainBooks.ejs Page
                let data = { ...shopData, books: result };
                res.render('bargainBooks.ejs', data);
            };
        });
    });

    // List Page Route
    app.get('/list', function (req, res) {
        // Define the SQL Query
        let sqlquery = "SELECT * FROM books";
        db.query(sqlquery, (err, result) => {
            if (err) { // If an Error has Occurred
                res.redirect('./'); // Redirect to the Home Page
            } else { // If the Query is Executed Successfully
                // Render the list.ejs Page
                let data = { ...shopData, books: result };
                res.render('list.ejs', data);
            }
        });
    });

    // Register Page Route
    app.get('/register', function (req, res) {
        res.render('register.ejs', shopData); // Rendering the register.ejs Page
    });

    // Registered Page Route
    app.post('/registered', function (req, res) {
        // Send a Response Message
        res.send(' Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered!  We will send an email to you at ' + req.body.email);
    });

    // Search Page Route
    app.get('/search', function (req, res) {
        res.render("search.ejs", shopData); // Rendering the search.ejs Page
    });

    // Search Result Page Route
    app.get('/search-result', function (req, res) {
        // Define the SQL Query
        let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.query.keyword + "%'";
        db.query(sqlquery, (err, result) => {
            if (result.length == 0) { // If No Results are Found
                res.send('No results found'); // Send a Response Message
            }
            else { // If the Query is Executed Successfully
                // Render the list.ejs Page
                let data = { ...shopData, books: result };
                res.render('list.ejs', data);
            };
        });
    });

};
