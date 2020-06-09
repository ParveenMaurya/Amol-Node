'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSettingSchema = new Schema({
	project_name: {type: String, default: ''},
	coin_name: {type: String, default: ''},
	email: {type: String, default: ''},
	domain_name: {type: String, default: ''},
	network_type: {type: String, default: ''},
	status: {type: Number, default: 0},
	exchange_btc_transaction_fees: {type: Number, default: 0.25},
	exchange_coin_transaction_fees: {type: Number, default: 0.25},
	withdraw_min_usd: {type: Number, default: 0},
	withdraw_btc_transaction_fee: {type: Number, default: 0},
	withdraw_coin_transaction_fee: {type: Number, default: 0},
	max_supply: {type: Number, default: 0},
	no_of_confirmation: {type: Number, default: 0},
	registation_plan: {type: String, enum : ['level', 'binary'], default: 'level'},
	level_plan: {type: String, enum : ['on', 'off'], default: 'off'},
	binary_plan: {type: String, enum : ['on', 'off'], default: 'on'},
	direct_plan: {type: String, enum : ['on', 'off'], default: 'off'},
	single_leg_per: {type: Number, default: 1},
	otp_status: {type: String, enum : ['on', 'off'], default: 'on'},
	sendmail: {type: String, enum : ['1', '0'], default: '1'},
	primary_link: {type: Number, default: 0},
	secondary_link: {type: Number, default: 0},
	registration_ph: {type: String, enum : ['1', '0'], default: '0'},
	registration_ph_amount: {type: Number, default: 550.00},
	matrix_value: {type: String, default: '0'},
	level_show: {type: Number, default: 4},
	stop_status: {type: String, enum : ['on', 'off'], default: 'on'},
	reg_start: {type: Number, default: 11},
	reg_stop: {type: Number, default: 24},
	link_swap_val: {type: String, enum : ['on', 'off'], default: 'on'},
	blockOnTimeOverCron: {type: Number, default: 0},
	blockOnTimeOverCronOnOffByAdmin: {type: String, enum : ['on', 'off'], default: 'on'},
	reg_vali_status: {type: String, enum : ['on', 'off'], default: 'on'},
	sendLinkSwapSmsCron_: {type: Number, default: 0},
	speedBonusCron: {type: Number, default: 0},
	passbvCron: {type: Number, default: 0},
	binaryQualifyCron: {type: Number, default: 0},
	binaryStricture: {type: Number, default: 0},
	binaryIncomeCron: {type: Number, default: 0},
	slot_no: {type: Number, default: 1},
	damdar_slot_no: {type: Number, default: 1},
	slot_no: {type: Number, default: 1},
	admin_otpstatus: {type: String, enum : ['On', 'Off'], default: 'On'},
	auto_link_swap_status: {type: Number, default: 0},
	loss: {type: Number, default: 0},
	profit: {type: Number, default: 0}
});

module.exports = mongoose.model('project_setting', ProjectSettingSchema);