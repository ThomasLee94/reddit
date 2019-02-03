// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

// AUTH CUSTOM MIDDLEWARE
let checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    console.log('HIT NO USER');
  } else {
    console.log(req.cookies);
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log(req.user); 
  }

  next();
};

/*  CONTROLLER IMPORTS */
const indexRouter = require('./controllers/index');
const postRouter = require('./controllers/post');
const commentRouter = require('./controllers/comment');
const subredditsRouter = require('./controllers/subreddit');
const authRouter = require('./controllers/auth');

// SETTING DB AND MONGOOSE CONNECTION
require('./data/reddit-db');

mongoose.connect(process.env.MONGODB_URI);

/*  INSTANCE OF EXPRESS */
const app = express();

/*  INITIALISE MIDDLEWARE  */
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(expressValidator());
app.use(checkAuth);

/*  HANDLEBARS (CLIENT SIDE RENDERING)  */
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/r', subredditsRouter);
app.use('/comments', commentRouter);
app.use('/users', authRouter); 

/*  PORT */ 
const port = process.env.PORT;
app.listen(port);

module.exports = app;
