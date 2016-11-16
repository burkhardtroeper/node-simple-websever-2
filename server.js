const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {

   return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {

    return text.toUpperCase();

});

app.set('view engine', 'hbs');

app.use((req,res,next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {

        if (err) console.log('Unable to append to server.log');

    });
    next();

});

// app.use((req,res,next) => {
//
//     res.render('maintenance.hbs', {
//
//         pageTitle: 'We will be right back',
//         currentYear: new Date().getFullYear(),
//         welcomeMessage: 'This website is under maintenance'
//
//     });
//
//
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Homepage',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website'
    });

});

app.get('/about', (req, res) =>{

    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });


});

app.get('/projects', (req,res) => {

    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    });

});

app.listen(port, () => {

    console.log('Server is up on port ' + port);

});