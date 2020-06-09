var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
// var cors = require('cors'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
// app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/saddaddapanel', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/route'); //importing route
routes(app); //register the route



//Middleware If any other route call which is not present
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);

console.log(port);