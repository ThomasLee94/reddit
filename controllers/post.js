const Post = require('../models/post');

module.exports = (app) => {
  app.get('/', (req, res) => {
    Post.find({})
      .then((posts) => {
        res.render('post-index', { posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  app.get('/posts/new', (req, res) => {
    res.render('new-post')
  })
  // CREATE
  app.post('/posts/new', (req,res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => res.redirect('/'));
  });
};
