const request = require('request-promise');

function googleTravelTime(req, res) {
  request({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/distancematrix/json",
    qs: {
      mode: 'transit',
      origins: req.query.origins,
      destinations: req.query.destinations,
      key: "AIzaSyDraZLLHGf5rr8jkYX5hKLN2jdTV5QNPig"
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
