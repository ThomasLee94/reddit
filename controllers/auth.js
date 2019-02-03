const jwt = require('jsonwebtoken');
// SIGN UP POST
app.post("/sign-up", (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user
    .save()
    .then(user => {
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      res.redirect("/");
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});