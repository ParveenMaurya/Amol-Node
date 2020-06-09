'use strict';

module.exports = function(app) {
	
	const controller = require('../controllers/controller_mongo');
	
	app.post("/sevenUpDownTopup",controller.sevenUpDownTopup);
}