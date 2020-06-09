'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdminFundWalletTransactionSchema = new Schema({
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
	wallet: {type: String, enum : ['topup_wallet', 'winning_wallet'], default : 'topup_wallet'},
	status: {type: String, enum : ['Win', 'Lose']},
	entry_time: {type: Date, default: Date.now, useCreateIndex: true}
});

module.exports = mongoose.model('admin_fund_wallet_transaction', AdminFundWalletTransactionSchema);