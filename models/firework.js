const mongoose = require('mongoose');
const config     = require("../config/routes");
const path       = require("path");
const firework = require("../models/firework");

const fireworkSchema = mongoose.Schema({
  title: String,
  location: {lat: Number, lng: Number},
  locationName: String,
  adultCostFrom: Number,
  childCostFrom: Number,
  underXFree: Boolean,
  underXAge: Number,
  openTime: String,
  startTime: String,
  date: Date,
  url: String,
  otherInfo:String
});

module.exports = mongoose.model('Firework', fireworkSchema);
