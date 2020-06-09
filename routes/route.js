'use strict';

module.exports = function(app) {
	
	// const controller = require('../controllers/controller_mongo');
	const controller = require('../controllers/controller_mongo_modified');
	
	app.post("/sevenUpDownTopup",controller.sevenUpDownTopup);
}