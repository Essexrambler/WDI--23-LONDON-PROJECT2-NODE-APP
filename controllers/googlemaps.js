const request = require('request-promise');

function googleTravelTime(req, res) {
  request({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/distancematrix/json",
    qs: {
      mode: 'transit',
      origins: req.query.origins,
      destinations: req.query.destinations,
      key: "AIzaSyD5p7q8Ryzq-b1m8hPfLttH0nYSQx_hLRk"
    },
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  googleTravelTime
};
