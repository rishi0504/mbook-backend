/**
 * Created by Rishabh on 1/31/2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var config = require("./config");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.database);


app.use(morgan('dev'));
require('./server/routes/signup.route')(app,express);
require('./server/routes/signin.route')(app,express);
require('./server/routes/current.user.route')(app, express);



app.get('/', function (req, res) {
    res.json({method: "Get method is called."});
});

app.listen(config.port, function () {
    console.log("Server is running on " + config.port);
})

