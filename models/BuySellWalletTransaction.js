const mongoose = require('mongoose')


const buySellWalletTransaction = mongoose.Schema({
    pin :{
        type : String,
        default: null
    },
    remark :{
        type : String,
        default: null
    },
    user_id:{
        type : Number,
        default: null
    },
    userid:{
        type : String,
        default: null
    },
    fullname:{
        type : String,
        default: null
    },
    tr_type:{
        type : String,
        enum :['Credit','Debit'],
        default: 'Credit'
    },
    type: {
        type: String,
        enum : ['Admin Fund','0-9 Game', '7 Up Down Game','Sell','Buy'],
        default: 'Admin Fund'
    },
    amount :{
        type : Number,
        default: 0
    },
    prev_balance :{
        type : Number,
        default: 0
    },
    balance :{
        type : Number,
        default: 0
    },
    
    status: {
        type: String,
        enum : ['Win','Lose'],
        default: null
    },
  
    entry_time:  {  
         type: Date,
         default: Date.now, 
         useCreateIndex: true
        },
    
})




const tblbuySellWalletTransaction = mongoose.model('buySellWalletTransaction', buySellWalletTransaction)

module.exports = tblbuySellWalletTransaction