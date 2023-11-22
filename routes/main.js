const e = require("express");

module.exports = function (app, shopData) {

    // Handle our routes
    app.get('/', function (req, res) {
        res.render('index.ejs', shopData)
    });
    app.get('/about', function (req, res) {
        res.render('about.ejs', shopData);
    });
    app.get('/search', function (req, res) {
        res.render("search.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.query.keyword + "%'"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (result.length == 0) {
                res.send('No results found');
            }
            else {
                res.send(result);
            }
         });
    });
    app.get('/register', function (req, res) {
        res.render('register.ejs', shopData);
    });
    app.post('/registered', function (req, res) {
        // saving data in database
        res.send(' Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered!  We will send an email to you at ' + req.body.email);
    });
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            else {
                res.send(result)
            }
         });
    });

}
