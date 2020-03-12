const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const project = require('./models/project');

const app = express();

mongoose.connect('mongodb+srv://dbuser:k1ll5tr3k@cluster0-oihxi.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to db');
});

app.use(helmet());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');



app.get('/users', (req, res) => {

    res.send({
        users: [
            {
                name: 'bryan',
                lastName: 'top'
            }
        ]
    });
});

app.get('/NWUI/index', (req, res) => {
    res.render('NWUI/index');
});


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/projects', (req, res, next) => {
    project.find((err, projects) => {
        if (err) return console.error(err);
        res.json(projects);
    }) 
})

app.post('/projects', (req, res, next) => {
    console.log(req.body.title);

    const newProject = {
        title: req.body.title,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        url: req.body.url
    }

    project.create(newProject)
    .then(() => {
        res.json({succes: true});
    })
    .catch(err => res.json({err:err}));
    
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});

//Run app, then load http://localhost:port in a browser to see the output.


