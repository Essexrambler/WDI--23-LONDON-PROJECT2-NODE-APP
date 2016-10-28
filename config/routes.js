const router = require('express').Router();
const yearbooksController = require('../controllers/yearbooksController.js');

router.route('/yearbooks')
.get(yearbooksController.index)
.post(yearbooksController.create);


  router.route('/yearbooks/:id')
    .get(yearbooksController.show);

    module.exports = router;
