var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 3000,
    app = express();

// Models
require('./models/Users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api', {
  useMongoClient: true,
  /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())


require('./controllers/Auth')(app);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
require('./controllers/Users')(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port)
console.log('API port: '+port);
