const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession  = require('express-session');

const config = require('./src/config');
const database = require('./src/db/loader');
const routes = require('./src/routes/loader');

const app = express();
const server = require('http').createServer(app);

app.set('port', process.env.PORT || config.port);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  let isEqual = false;

  if (req.cookies && req.cookies.gonsDate) {
    const date = JSON.parse(req.cookies.gonsDate);
    if (new Date(date).toDateString() === new Date().toDateString()) {
      isEqual = true;
    }
  }

  if (!isEqual) {
    res.cookie('gonsDate', Date.now());
    
    try {
      const counter = new (app.get('database')).CounterModel({ date: new Date() });
      counter.save();
    } catch (e) {

    }
  }

  next();
});

app.use(express.static(path.join(__dirname, '/public')));

routes.init(app, router);

server.listen(app.get('port'), () => {
  database.init(app, config.db);
  console.log(`Run... port ${app.get('port')}`);
});