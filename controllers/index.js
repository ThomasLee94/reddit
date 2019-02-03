const express = require('express');

const router = express.Router();

const Post = require('../models/post');

// SHOW POSTS
router.get('/', (req, res) => {
  Post.find({})
    .then((posts) => {res.render('post-index', { posts }); })
    .catch((err) => {console.log(err.message); });
});

module.exports = router; 