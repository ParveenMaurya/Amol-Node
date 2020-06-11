var express = require('express'),
port = process.env.PORT || 3000;
// var cors = require('cors'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);
// app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/saddaddapanel', { useNewUrlParser: true,  useUnifiedTopology: true  }); 


var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var routes = require('./routes/route'); //importing route
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        console.log(numCPUs,"aaaa")
        cluster.fork();
    }
} else {
	var app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	routes(app); //register the route
	
	app.use(function(req, res) {
	  res.status(404).send({url: req.originalUrl + ' not found'})
	});
	app.listen(port);

	console.log(port);
}


//Middleware If any other route call which is not present