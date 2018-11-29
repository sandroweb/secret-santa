const express = require('express');
const app = express();
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const secretSanta = require('../lib/secret-santa');

const indexController = require('../controllers/index');
const adminController = require('../controllers/admin');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(secretSanta.fetchConfig()['cookie-secret']));

app.use(session({
  secret: secretSanta.fetchConfig()['session-secret'],
  resave: true,
  saveUninitialized: false
}));

app.use('/', indexController);
app.use('/admin', indexController);

const port = process.env.PORT || 3000;

const server = app.listen(port, process.env.IP, function () {
  console.log('Listening on port %d', server.address().port);
});
