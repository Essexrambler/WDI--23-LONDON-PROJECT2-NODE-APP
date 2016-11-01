const Firework = require('../models/firework');

function fireworksIndex(req, res) {
  Firework.find({}, (err, fireworks) => {
    if(err) res.status(500).json({error: err});
    res.json(fireworks);
  });
}

function fireworksCreate(req, res) {
  Firework.create(req.body, (err, fireworks) => {
    if(err)res.status(500).json({error: err});
    res.status(201).json(fireworks);
  });
}

function fireworksShow(req, res) {
  firework.findById(req.params.id, (err, fireworks) => {
    if(err) res.status(500).json({error: err});
    res.json(fireworks);
  });
}



module.exports = {
  index: fireworksIndex,
  create: fireworksCreate,
  show: fireworksShow
};
