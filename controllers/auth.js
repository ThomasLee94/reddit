const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

// SIGN UP FORM
router.get('/users/sign-up', (req, res) => {
  res.render('sign-up');
});

// SIGN UP POST
router.post('/users/sign-up', (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user.save().then((user) => {
    let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });

});

// LOGOUT
router.get('/users/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

// LOGIN FORM
router.get('/users/login', (req, res) => {
  res.render('login');
});

module.exports = router