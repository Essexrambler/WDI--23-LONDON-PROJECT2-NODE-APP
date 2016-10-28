const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./config/routes');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/firestarters';
const app = express();
mongoose.connect(mongoUri);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use('/',router);

app.listen(port);
