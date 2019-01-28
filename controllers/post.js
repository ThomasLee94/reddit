const Post = require('../models/post');

module.exports = (app) => {
  // SHOW POSTS
  app.get('/', (req, res) => {
    Post.find({})
      .then((posts) => {
        res.render('post-index', { posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // RENDER NEW-POST PAGE
  app.get('/posts/new', (req, res) => {
    res.render('new-post')
  })

  // CREATE NEW POST
  app.post('/posts/new', (req,res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => res.redirect('/'));
  });

  // SEE INDIVIDUAL POST 
  app.get('/post/:id', (req, res) => {
    console.log("************************")
    console.log(req.params.id)
    // LOOK UP POST
    Post.findById(req.params.id)
      .then((post) => {
        res.render('posts-show', {post});
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
