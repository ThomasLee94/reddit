const Post = require('../models/post');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('new-post');
    })
    // CREATE
    app.post('/posts/new', (req,res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            return res.redirect('/');
        })
    })
}