'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tblDashboardSchema = new Schema({
	id: {type: String, default: 0},
	coin: {type: Number, default: 0},
	btc: {type: Number, default: 0},
	usd: {type: Number, default: 0},
	total_investment: {type: Number, default: 0},
	active_investment: {type: Number, default: 0},
	direct_income: {type: Number, default: 0},
	direct_income_withdraw: {type: Number, default: 0},
	direct_income_updown: {type: Number, default: 0},
	direct_income_withdraw_updown: {type: Number, default: 0},
	direct_income_shatak: {type: Number, default: 0},
	direct_income_withdraw_shatak: {type: Number, default: 0},
	level_income: {type: Number, default: 0},
	level_income_withdraw: {type: Number, default: 0},
	level_income_ico: {type: Number, default: 0},
	roi_income: {type: Number, default: 0},
	roi_income_withdraw: {type: Number, default: 0},
	speed_bonus: {type: Number, default: 0},
	speed_bonus_withdraw: {type: Number, default: 0},
	binary_income: {type: Number, default: 0},
	binary_income_withdraw: {type: Number, default: 0},
	top_up_wallet: {type: Number, default: 0},
	top_up_wallet_withdraw: {type: Number, default: 0},
	transfer_wallet: {type: Number, default: 0},
	transfer_wallet_withdraw: {type: Number, default: 0},
	working_wallet: {type: Number, default: 0},
	working_wallet_withdraw: {type: Number, default: 0},
	total_withdraw: {type: Number, default: 0},
	total_profit: {type: Number, default: 0},
	single_leg_income: {type: Number, default: 0},
	single_leg_income_withdraw: {type: Number, default: 0},
	servenupdown_income: {type: Number, default: 0},
	servenupdown_income_withdraw: {type: Number, default: 0},
	zeronine_income: {type: Number, default: 0},
	zeronine_income_withdraw: {type: Number, default: 0},
	damdar_shatak_income: {type: Number, default: 0},
	damdar_shatak_income_withdraw: {type: Number, default: 0},
	sevenudadmin_wallet: {type: Number, default: 0},
	sevenudadmin_wallet_withdraw: {type: Number, default: 0},
	winning_wallet: {type: Number, default: 0},
	winning_wallet_withdraw: {type: Number, default: 0},
	entry_time: {type: Date, default: Date.now, useCreateIndex: true}
});

module.exports = mongoose.model('dashboard', tblDashboardSchema);