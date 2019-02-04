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

// CUSTOM AUTH MIDDLEWARE IMPORT
const checkAuth = require('./lib/checkAuth');

/*  CONTROLLER IMPORTS */
const indexRouter = require('./controllers/index');
const postRouter = require('./controllers/post');
const commentRouter = require('./controllers/comment');
const subredditsRouter = require('./controllers/subreddit');
const authRouter = require('./controllers/auth');

// SETTING DB AND MONGOOSE CONNECTION
require('./data/reddit-db');

mongoose.connect(process.env.MONGODB_URI);

// INSTANCE OF EXPRESS 
const app = express();

//  REQ/RES MIDDLEWARE  
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(expressValidator());

// AUTH CUSTOM MIDDLEWARE
app.use(checkAuth);

/*  HANDLEBARS (CLIENT SIDE RENDERING)  */
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/r', subredditsRouter);
app.use('/comments', commentRouter);
app.use('/users', authRouter); 

// PORT 
const port = process.env.PORT;
app.listen(port);

module.exports = app;
