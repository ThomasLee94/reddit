/* ****************
 * Project: REDDIT*
 * ****************
 * */

/** Require npm packages */
// dotenv will be needed for secrets
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

/*  Run app.js as an instasnce of express */
let app = express();

/*  Initialise cookieParser  */
app.use(cookieParser());
app.use(express.static('public'))
/*  Use body-parser */ 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

let checkAuth = (req, res, next) => {
    console.log("Checking authentication");

    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
      console.log('HIT NO USER')
    } else {
        console.log(req.cookies)
      let token = req.cookies.nToken;
      let decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
      console.log(req.user)
    }
  
   next()
  }

/*  Connecting to mongoose */ 
mongoose.connect(process.env.MONGODB_URI);
/* Checking or mongoose connection */
let db = mongoose.connection;
db.on("connected", () => {
    console.log("Success: connected to MongoDB");
})

/*  Use handlebars for client-side rendering  */
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

/* Authentication */
app.use(checkAuth);

/*  Importing controllers */
require('./controllers/users')(app);
require('./controllers/auth')(app);

/*  Port */ 
const port = process.env.PORT || 3000;
app.listen(port)