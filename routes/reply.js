const Post = require('../models/post');
const Comment = require('../models/comment');

const checkAuth = require('../middleware/checkAuth');

const express = require('express');
const router = express.Router();

// NEW REPLY
router.get('/posts/:postId/comments/:commentId/replies/new', checkAuth, (req, res) => {
 
  Post.findById(req.params.postId)
    .then((p) => {
      post = p;
      return Comment.findById(req.params.commentId);
    })
    .then((comment) => {
      res.render('replies-new', { post, comment });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// CREATE REPLY
router.post('/posts/:postId/comments/:commentId/replies', checkAuth, (req, res) => {
  // TURN REPLY INTO A COMMENT OBJECT
  const reply = new Comment(req.body);
  reply.author = req.user._id
  // LOOKUP THE PARENT POST
  Post.findById(req.params.postId)
    .then((post) => {
      // FIND THE CHILD COMMENT
      Promise.all([
        reply.save(),
        Comment.findById(req.params.commentId),
      ])
        .then(([reply, comment]) => {
          // ADD THE REPLY
          comment.comments.unshift(reply._id);
          return Promise.all([
            comment.save(),
          ]);
        })
        .then(() => {
          res.redirect(`/posts/${req.params.postId}`);
        })
        .catch(console.error);
      // SAVE THE CHANGE TO THE PARENT DOCUMENT
      return post.save();
    });
});

module.exports = router;
