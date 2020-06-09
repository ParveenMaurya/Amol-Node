'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DamdarShatakWalletTransactionSchema = new Schema({
	user_id: {type: Number, default: null},
	userid: {type: String, default: null},
	fullname: {type: String, default: null},
	type: {type: String, enum : ['Admin Fund','0-9 Game','7 Up Down Game','Sell','Buy'], default: 'Admin Fund'},
	tr_type: {type: String, enum : ['Credit', 'Debit'], default: 'Credit'},
	amount: {type: Number, default: 0},
	prev_balance: {type: Number, default: 0},
	balance: {type: Number, default: 0},
	remark: {type: String, default: null},
	pin: {type: String, default: null},
	status: {type: String, enum : ['Win', 'Lose']},
	entry_time: {type: Date, default: Date.now, useCreateIndex: true}
});

module.exports = mongoose.model('damdar_shatak_wallet_transaction', DamdarShatakWalletTransactionSchema);