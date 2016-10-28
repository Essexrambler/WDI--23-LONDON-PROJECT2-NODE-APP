const mongoose = require('mongoose');

const yearbookSchema = mongoose.Schema({
name: {type:String},
github: {type:String},
image: {type:String},
bio: {type:String},
portfolio: {type:String},
project_titles: {type:[]}
});

module.exports = mongoose.model('Yearbook', yearbookSchema);
