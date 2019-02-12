const express = require('express');

const router = express.Router();
const checkUser = require('../middleware/checkUser')

const Post = require('../models/post');

// SHOW POSTS
router.get('/', checkUser, (req, res) => {
  const currentUser = req.user; 
  console.log('CURRENT USER IN INDEX ROUTE', currentUser);
  Post.find().populate('author')
    .then((posts) => {
      res.render('post-index', { posts, currentUser }); 
    }).catch((err) => {console.log(err.message); });
});

module.exports = router; 