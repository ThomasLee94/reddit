/* eslint-disable func-names */
const Post = require('../models/post');
const Comment = require('../models/comment');

const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth')

// CREATE COMMENT
router.post('/:postid/comments', checkAuth, (req, res) => {
  // INSTANTIATE COMMENT MODEL
  const comment = new Comment(req.body);
  comment.author = req.user._id
  // SAVE INSTANCE OF COMMENT MODEL TO DB
  comment 
    .save()
    .then((comment) => { 
      return Post.findById(req.params.postid)
    })
    .then(([post, user]) => { 
      post.comments.unshift(comment); 
      return post.save() 
    })
    .then((post) => { res.redirect(`/posts/${post._id}`) })
    .catch((err) => { console.log(err); });
});

module.exports = router; 
