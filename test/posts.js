// test/posts.js
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import Post model
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', function() {
  const agent = chai.request.agent(server);
  const newPost = {
      title: 'post title',
      url: 'https://www.google.com',
      summary: 'post summary',
  };
  it("should create with valid attributes at POST /posts/new", function (done) {
    chai
    // Testing if post was created
      .request(app)
      .post('/posts/new')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        return done();
      })
  });
});