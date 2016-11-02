const router = require('express').Router();
const fireworksController = require('../controllers/fireworks.js');
const citymapperController = require('../controllers/citymapper.js');
const googlemapsController = require('../controllers/googlemaps.js');
const secret = require('./tokens').secret;
const jwt = require('jsonwebtoken');
const usersControllers = require('../controllers/users');
const authControllers   = require('../controllers/auth');

function secureRoute(req, res, next) {
  console.log('in here');
  if(!req.headers.authorization)return res.status(401).json ({ message: "access denied"});
  let token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json ({ message: "access denied"});
    req.user = payload;
    next();
  });
}

router.route('/citymapper')
  .get(citymapperController.travelTime);

router.route('/googlemaps')
  .get(googlemapsController.googleTravelTime);

router.route('/register')
  .post(authControllers.register);
router.route('/login')
  .post(authControllers.login);

router.route('/register')
  .post(authControllers.register);
router.route('/login')
  .post(authControllers.login);

router.route('/fireworks')
//  .all(secureRoute)
  .get(fireworksController.index)
  .post(fireworksController.create);


router.route('/fireworks/:id')
  .get(secureRoute, fireworksController.show);


router.route('/users')
.all(secureRoute)
  .get(usersControllers.index)
  .post(usersControllers.create);

router.route('/users/:id')
  .all(secureRoute)
  .put(usersControllers.update)
  .get(usersControllers.show)
  .delete(usersControllers.delete);


module.exports = router;
