'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tblProjectSettingSchema = new Schema({
	id: {type: Number, default: ''},
	user_id: {type: String, default: ''},
	invite_code: {type: String, default: ''},
	ref_user_id: {type: String, default: ''},
	fullname: {type: String, default: ''},
	nominee_name: {type: String, default: ''},
	relation: {type: String, default: ''},
	pin_number: {type: String, default: ''},
	product_id: {type: Number, default: 0},
	amount: {type: String, default: ''},
	city: {type: String, default: ''},
	state: {type: String, default: ''},
	mobile: {type: String, default: ''},
	email: {type: String, default: ''},
	gender: {type: String, default: ''},
	account_no: {type: String, default: ''},
	holder_name: {type: String, default: ''},
	bank_name: {type: String, default: ''},
	branch_name: {type: String, default: ''},
	pan_no: {type: String, default: ''},
	ifsc_code: {type: String, default: ''},
	btc_address: {type: String, default: ''},
	password: {type: String, default: ''},
	bcrypt_password: {type: String, default: ''},
	encryptpass: {type: String, default: ''},
	tr_passwd: {type: String, default: ''},
	position: {type: String, default: ''},
	l_c_count: {type: String, default: ''},
	r_c_count: {type: String, default: ''},
	l_bv: {type: String, default: ''},
	r_bv: {type: String, default: ''},
	vl_bv: {type: String, default: ''},
	vr_bv: {type: String, default: ''},
	confirmed_users: {type: Number, default: 0},
	virtual_parent_id: {type: Number, default: 0},
	status: {type: String, enum : ['Active','Inactive'], default: 'Inactive'},
	entry_time: {type: Date, default: Date.now, useCreateIndex: true},
	session_id: {type: Number, default: 0},
	type: {type: String, default: ''},
	roi_stop: {type: Number, default: 0},
	address: {type: String, default: ''},
	address1: {type: String, default: ''},
	country: {type: String, default: ''},
	ethereum: {type: String, default: ''},
	pincode: {type: String, default: ''},
	pincode1: {type: String, default: ''},
	state1: {type: String, default: ''},
	city1: {type: String, default: ''},
	delivery_status: {type: String, enum : ['Pending','Delivered','Cancel'], default: 'Pending'},
	delivery_note: {type: String, default: ''},
	designation: {type: String, default: ''},
	old_status: {type: Number, default: 0},
	delivery_mode: {type: String, default: ''},
	pdc_id: {type: Number, default: ''},
	verifyaccountstatus: {type: Number, default: ''},
	verifytoken: {type: String, default: ''},
	mobileverify_status: {type: Number, default: ''},
	mobile_otp: {type: String, default: ''},
	flag: {type: String, default: ''},
	tempf: {type: String, default: ''},
	topup_status: {type: String, enum : ['0','1'], default: '0'},
	notification: {type: Number, default: 0},
	stop_roi_time: {type: Date, default: null},
	pindate: {type: Date, default: null},
	confirm_date: {type: Date, default: null},
	google2fa_secret: {type: String, default: ''},
	google2fa_status: {type: String, default: ''},
	service_date3: {type: Date, default: null},
	dispatch_date: {type: Date, default: ''},
	delivery_date: {type: Date, default: ''},
	dob: {type: Date, default: null},
	remember_token: {type: String, default: ''},
	eth_address: {type: String, default: ''},
	ltc_address: {type: String, default: ''},
	factor_status: {type: String, default: ''},
	payment_mode: {type: String, enum : ['BTC', 'CASH', 'BANK', 'ADMIN']},
	paytm_no: {type: String, default: ''},
	tez_no: {type: String, default: ''},
	phonepe_no: {type: String, default: ''},
	mobikwik_no: {type: String, default: ''},
	payment_type: {type: String, enum : ['1', '2', '3'], default: '1'},
	adminreg: {type: Number, default: 0},
	binaryapplied: {type: String, enum : ['0', '1'], default: '0'},
	pin_passwd: {type: String, default: ''}
});

module.exports = mongoose.model('user', tblProjectSettingSchema);