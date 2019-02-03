const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// SUBREDDIT
router.get('/r/:subreddit', (req, res) => {
  Post.find({ subreddit: req.params.subreddit })
    .then((posts) => { res.render('post-index', { posts }); })
    .catch((err) => { console.log(err); });
});

module.exports = router; 
