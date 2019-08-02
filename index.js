global.Promise = require("bluebird");
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const user = require('./routes/users');
const product = require('./routes/products');

const app = express();

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.json({ "msg": "Hello World" });
});

app.use('/api/users', user);
app.use('/api/products', product);

app.listen(3000, function () { console.log('Node server listening on port 3000'); });