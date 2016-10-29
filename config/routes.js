const router = require('express').Router();
const secret = require('./tokens').secret;
const jwt = require('jsonwebtoken');

const usersControllers = require('../controllers/users');
const authControllers   = require('../controllers/auth');

function secureRoute(req, res, next) {
  if(!req.headers.authorization)return res.status(401).json ({ message: "access denied"});
  let token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json ({ message: "access denied"});
    req.user = payload;
    next();
  });
}

router.route('/register')
  .post(authControllers.register);
router.route('/login')
  .post(authControllers.login);


router.route('/users')
  .get(secureRoute, usersControllers.index);

router.route('/users/:id')
  .all(secureRoute)
  .post(usersControllers.create)
  .get(usersControllers.show)
  .delete(usersControllers.delete);


module.exports = router;
