'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productGameUpdownSchema = new Schema({
    name :{
        type : String,
        default: ''
    },
    cost:{
        type : Number,
        default: 0
    },
    direct_income:{
        type : Number,
        default: 0
    },
    bvalue:{
        type : Number,
        default: 0
    },
    min_hash:{
        type : Number,
        default: 0
    },
    max_hash:{
        type : Number,
        default: 0
    },
    winning_amount:{
        type : Number,
        default: 0
    },
    hash_rate: {
        type: String,
        enum : ['KH','MH','GH','TH','PH'],
        default: 'KH'
    },
    roi:{
        type : Number,
        default: 0

    },
    duration:{
        type : Number,
        default: 0
    },
    duration_month:{
        type : Number,
        default: 0
    },
    daily_profit:{
        type : Number,
        default: 0
    },
    total_profit:{
        type : Number,
        default: 0
    },
    level_roi   :{
        type : Number,
        default: 0
    },
    capping   :{
        type : Number,
        default: 0
    },
    binary   :{
        type : Number,
        default: 0
    },
    date_diff   :{
        type : Number,
        default: 1
    },
    management_fee   :{
        type : Number,
        default: 0
    },
    consumption_charge   :{
        type : Number,
        default: 0
    },
    conversion_rate   :{
        type : Number,
        default: 0
    },
    ref_product_id   :{
        type : Number,
        default: 0
    },
    status: {
        type: String,
        enum : ['Active','Inactive','Deleted'],
        default: 'Active'
    },
    user_show_status: {
        type: String,
        enum : ['Active','Inactive'],
        default: 'Active'
    },
    type: {
        type: String,
        enum : ['1','2'],
        default: '1'
    },
    currency_code:{
        type : String,
        default: null
    },
    entry_time:  {  
        type: Date,
        default: Date.now, 
        useCreateIndex: true
       },
       update_at:  {  
        type: Date,
        default: Date.now, 
        useCreateIndex: true
       },
    
})




module.exports = mongoose.model('product_game_updown', productGameUpdownSchema);

// module.exports = tblProductGameUpdown