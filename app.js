const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/calculator/index', (req, res) => {
    res.render('calculator/index');
});


app.get('/fullThreePageWebsite/index', (req, res) => {
    res.render('fullThreePageWebsite/index');
});

app.get('/fullThreePageWebsite/about', (req, res) => {
    res.render('fullThreePageWebsite/about');
});

app.get('/fullThreePageWebsite/services', (req, res) => {
    res.render('fullThreePageWebsite/services');
});

app.get('/landingPage/index', (req, res) => {
    res.render('landingPage/index');
});

app.get('/parallaxWebsite/index', (req, res) => {
    res.render('parallaxWebsite/index');
});

app.get('/weightConverter/index', (req, res) => {
    res.render('weightConverter/index');
});

app.get('/', (req, res) => {
    res.render('index');
});

let port = 3000;

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});

//Run app, then load http://localhost:port in a browser to see the output.


