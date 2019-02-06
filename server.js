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

// ROUTE IMPORTS
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const subredditsRouter = require('./routes/subreddit');
const authRouter = require('./routes/auth');

// SETTING DB AND MONGOOSE CONNECTION
require('./data/reddit-db');

// INSTANCE OF EXPRESS
const app = express();

//  REQ/RES MIDDLEWARE
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressValidator());

/*  HANDLEBARS (CLIENT SIDE RENDERING)  */
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// CUSTOM ROUTES
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/r', subredditsRouter);
app.use('/comments', commentRouter);
app.use('/users', authRouter);

// PORT
const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;