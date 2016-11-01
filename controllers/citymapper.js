const request = require('request-promise');

function travelTime(req, res) {
  request({
    method: "GET",
    url: "https://developer.citymapper.com/api/1/traveltime/",
    qs: {
      startcoord: req.query.startcoord,
      endcoord: req.query.endcoord,
      time_type: "arrival",
      key: process.env.CITYMAPPER_KEY
    },
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  travelTime
};
