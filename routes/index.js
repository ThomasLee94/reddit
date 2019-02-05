const express = require('express');

const router = express.Router();
const checkUser = require('../lib/checkUser')

const Post = require('../models/post');

// SHOW POSTS
router.get('/', checkUser, (req, res) => {
  const currentUser = req.user; 
  console.log(currentUser)
  Post.find({})
    .then((posts) => {
      res.render('post-index', { posts, currentUser }); 
    })
    .catch((err) => {console.log(err.message); });
});

module.exports = router; 