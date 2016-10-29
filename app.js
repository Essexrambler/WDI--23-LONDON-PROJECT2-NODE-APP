const express = require('express');
const morgan = require('morgan');
const router = require('./config/routes');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/firestarters';

mongoose.connect(mongoUri);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => console.log(`Express started on port: ${port}`));
