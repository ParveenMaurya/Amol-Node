const mongoose = require('mongoose')


const topupGameUpdown = mongoose.Schema({
    id :{
        type : String,
        default: ''
    },
    pin :{
        type : String,
        default: ''
    },
    quantity:{
        type : Number,
        default: 1
    },
    amount:{
        type : Number,
        default: 0
    },
    percentage:{
        type : Number,
        default: 0
    },
    type:{
        type : String,
        default: 0
    },
    dice1:{
        type : Number,
        default: 0
    },
    winning_amount:{
        type : Number,
        default: 0
    },
    status: {
        type: String,
        enum : ['Win','Lose'],
        default: null
    },
    dice2:{
        type : Number,
        default: 0

    },
    dice_sum:{
        type : Number,
        default: 0
    },
    duration_month:{
        type : Number,
        default: 0
    },
    usd_rate:{
        type : Number,
        default: 0
    },
    total_profit:{
        type : Number,
        default: 0
    },
    payout_no   :{
        type : String,
        default: 'user'
    },
    top_up_type   :{
        type : Number,
        default: 0
    },
    top_up_by   :{
        type : String,
        default: 0
    },
    binary_pass_status   :{
        type : Number,
        default: 0
    },
    level_pass_status   :{
        type : Number,
        default: 0
    },
    direct_pass_status   :{
        type : Number,
        default: 0
    },
    binary_pass_time : {
        type: Date, default:
         Date.now, 
         useCreateIndex: true,
         default:null
    },
    cycle   :{
        type : Number,
        default: 1
    },
    retopup_mail: {
        type: String,
        enum : ['0','1'],
        default: '0'
    },
    roi_status: {
        type: String,
        enum : ['Active','Inactive'],
        default: 'Inactive'
    },
    sms_status: {
        type: String,
        enum : ['0','1'],
        default: '0'
    },
    club_income_status: {
        type: String,
        enum : ['0','1'],
        default: '0'
    },
    entry_time:  {  
         type: Date,
         default: Date.now, 
         useCreateIndex: true
        },
    
})




const tblTopupGameUpdown = mongoose.model('topupGameUpdown', topupGameUpdown)

module.exports = tblTopupGameUpdown