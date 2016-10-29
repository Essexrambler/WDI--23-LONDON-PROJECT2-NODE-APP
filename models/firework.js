const mongoose = require('mongoose');
const config     = require("../config/routes");
const path       = require("path");
const firework = require("../models/firework");
//
// const yearbookSchema = mongoose.Schema({
// name: {type:String,},
// github: {type:String},
// image: {type:String},
// bio: {type:String},
// portfolio: {type:String},
// project_titles: {type:[]}
// });



const fireworkSchema = mongoose.Schema({
  name: {type: String, trim: true, required: true},
  postcode: {type: String, trim: true},
  url: {type: String, trim: true, required: true}

});




module.exports = mongoose.model('Firework', fireworkSchema);
