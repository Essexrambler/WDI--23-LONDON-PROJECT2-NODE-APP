const router = require('express').Router();
const fireworksController = require('../controllers/fireworksController.js');

router.route('/fireworks')
.get(fireworksController.index)
.post(fireworksController.create);


  router.route('/fireworks/:id')
    .get(fireworksController.show);

    module.exports = router;
