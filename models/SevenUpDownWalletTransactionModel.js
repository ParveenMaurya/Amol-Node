'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SevenupdownwallettransactionsSchema = new Schema({
	user_id: {type: String, default: null},
	fullname: {type: String, default: null},
	type: {type: String, enum : ['Admin Fund','0-9 Game','7 Up Down Game','Sell','Buy'], default: 'Admin Fund'},
	tr_type: {type: String, enum : ['Credit', 'Debit'], default: 'Credit'},
	amount: {type: Number, default: 0},
	prev_balance: {type: String, default: 0},
	balance: {type: String, default: 0},
	remark: {type: String, default: null},
	pin: {type: String, default: null},
	wallet: {type: String, enum : ['topup_wallet','winning_wallet','','']},
	status: {type: String, enum : ['Win', 'Lose']},
	entry_time: {type: Date, default: Date.now, useCreateIndex: true}
});

module.exports = mongoose.model('seven_up_down_wallet_transactions', SevenupdownwallettransactionsSchema);