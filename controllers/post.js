const Post = require('../models/posts');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('main')
    }).catch((err) => {
        console.log(err)
    })
}