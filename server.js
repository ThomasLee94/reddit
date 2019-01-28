/* ****************
 * Project: REDDIT*
 * ****************
 * */

require('dotenv').config()
const express = require('express');
const pug = require('pug');
const path = require('path')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

/*  Run app.js as an instasnce of express */
const app = express();

/*  Initialise cookieParser  */
app.use(cookieParser());
app.use(express.static('public'));

/*  Use body-parser */ 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// Use express-validator
app.use(expressValidator());

// let checkAuth = (req, res, next) => {
//   console.log('Checking authentication');
//   if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
//     req.user = null;
//     console.log('HIT NO USER')
//   } else {
//     console.log(req.cookies)
//     let token = req.cookies.nToken;
//     let decodedToken = jwt.decode(token, { complete: true }) || {};
//     req.user = decodedToken.payload;
//     console.log(req.user)
//   }

//   next()
// }

/*  Connecting to mongoose */ 
mongoose.connect(process.env.MONGODB_URI);

/*  Use PUG for client-side rendering  */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Authentication */
// app.use(checkAuth);

/*  Importing controllers */
require('./controllers/post')(app);

// Setting db
require('./data/reddit-db');

/*  Port */ 
const port = process.env.PORT || 3000;
app.listen(port); 

module.exports = app;