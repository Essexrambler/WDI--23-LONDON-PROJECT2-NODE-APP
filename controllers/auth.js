const User = require('../models/user');
const secret = require('../config/tokens').secret;
const jwt = require("jsonwebtoken");


function register(req, res){
  User.create(req.body, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong.", err });
    let payload = { _id: user._id, username: user.username };
    let token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}


function login(req, res){
  User.findOne({ $or: [
    { username: req.body.username },
  ]}, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Unauthorized."
    });
  }
  let payload = { _id: user._id, username: user.username };
  let token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
  return res.status(200).json({
    message: "Welcome back.",
    user,
    token
  });
});
}


module.exports = {
  register: register,
  login: login
};
