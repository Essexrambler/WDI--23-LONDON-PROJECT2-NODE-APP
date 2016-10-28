const express = require('express');
const morgan = require('morgan');
const router = require('./config/routes');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/firestarters';
const app = express();
mongoose.connect(mongoUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',router);

app.listen(port);
