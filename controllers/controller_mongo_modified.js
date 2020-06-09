const validate = require('../libs/validateLib');
const isEmpty = require('../libs/checkLib');
const allModel = require('../libs/allModels');
var mongoose = require('mongoose');

let user;
let product;
let userDashboard;
let amount;
let loss;
let profit;
let adminDashboard;
let prj_settings;
let status;
// allModel.DashboardModel.find({'id' : "1"}).then(function(result) {
//     adminDashboard = result[0];
//     // console.log(adminDashboard);
//     // console.log('got admin');
// }).catch(function(error){
//     // console.log(error);
//     res.json({status : false , error : error});
// });

allModel.ProjectSettingModel.find({"project_name" : "Sadda Adda"}).then(function(result) {
    prj_settings = result[0];
    loss = prj_settings.loss;
    profit = prj_settings.profit;
    // console.log(profit,'got project settings');
}).catch(function(error){
    // console.log(error);
    res.json({status : false , error : error});
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function sevenUpDownTopup(req,res){
    const entry_time = new Date();
    const {error} = validate(req.body);
    if(error){
        res.json({status : 404,error : true,result : null, msg : "Invalid Parameters Passed"});
    }

    allModel.UsersModel.find({'user_id' : req.body.user_id}).then(function(result) {
        // console.log('got user');
        user = result[0];
        allModel.DashboardModel.find({'id' : user.id}).then(function(result) { 
            // console.log('got dashboard');
            userDashboard = result[0];
            userBalance = userDashboard.top_up_wallet - userDashboard.top_up_wallet_withdraw;
            amount = req.body.amount;
            if(amount > userBalance){
                res.json({status : 403,error : true,result : null,msg : "Insufficient balance"});
            }
            var id = new mongoose.Types.ObjectId(req.body.product_id);
            allModel.ProductGameUpdown.find({'_id' : id}).then(function(result) {

                product = result[0];
                let is_win = 0;
                let is_random = 0;
                let pin = getRndInteger(1111111111,9999999999);
                let winning_amount = amount * product.winning_amount;

                allModel.DashboardModel.find({'id' : "1"}).then(function(result) {
                    adminDashboard = result[0];
                    admin_balance = adminDashboard.sevenudadmin_wallet - adminDashboard.sevenudadmin_wallet_withdraw;
                    // console.log(admin_balance);
                    let newloss = -loss;
                    // console.log(newloss);
                    // console.log(admin_balance,newloss,profit,"admin_balance--newloss--profit");
                    if(admin_balance <= newloss ){
                        is_win = 0;
                    }
                    if(admin_balance >= profit){
                        is_win = 1;
                    }
                    if(admin_balance > newloss && admin_balance < profit){
                        is_random = 1;
                    }
                    if(is_random == 1){
                        is_win = getRndInteger(0,2);
                    }
                    if(is_win == 1){
                        status = "Win";
                        let updateData = {
                            top_up_wallet : userDashboard.top_up_wallet + winning_amount
                        }
                        let searchArray = new Object();
                        searchArray['id'] = user.id;
                        allModel.DashboardModel.updateOne(searchArray,updateData).then(function(result){
                            updateData = {
                                sevenudadmin_wallet_withdraw : adminDashboard.sevenudadmin_wallet_withdraw + winning_amount
                            }
                            // console.log(updateData,"updateData");
                            let searchArrayDas = new Object();
                            searchArrayDas['id'] = "1";
                            allModel.DashboardModel.updateOne(searchArrayDas,updateData).then(function(result){
                                // console.log('updating');
                                let insertData = {
                                    user_id : user.id,
                                    userid : req.body.user_id,
                                    tr_type : "Credit",
                                    amount : winning_amount,
                                    prev_balance : userDashboard.top_up_wallet,
                                    balance : userDashboard.top_up_wallet + winning_amount,
                                    pin : pin,
                                    status : "Win",
                                    entry_time : entry_time,
                                    type: "7 Up Down Game",
                                    wallet : "winning_wallet"
                                }
                                let new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insertData);
                                new_seven_up_down_wallet_transactions.save(function(err, result) {
                                    if(err) console.log(err);
                                    console.log('WinInserted');
                                    return res.send({
                                        is_win : is_win,
                                        status : status,
                                        winning_amount : winning_amount,
                                        Msg : "You won"
                                    });
                                });
                            }).catch(function(error){
                                console.log(error);
                                res.json({status : false , error : error});
                            });
                        }).catch(function(error){
                            console.log(error);
                            res.json({status : false , error : error});
                        });
                    }else{
                        status = "Loose";
                        let updateData = {
                            top_up_wallet_withdraw : userDashboard.top_up_wallet_withdraw + amount
                        }
                        let searchDasArray = new Object();
                        searchDasArray['id'] = user.id;
                        allModel.DashboardModel.updateOne(searchDasArray,updateData).then(function(result){
                            updateData = {
                                sevenudadmin_wallet : adminDashboard.sevenudadmin_wallet + amount
                            }
                            let searchDasArrayup = new Object();
                            searchDasArrayup['id'] = "1";
                            allModel.DashboardModel.updateOne(searchDasArray,updateData).then(function(result){
                                let insertData = {
                                    user_id : user.id,
                                    userid : req.body.user_id,
                                    tr_type : "Debit",
                                    amount : winning_amount,
                                    prev_balance : userDashboard.top_up_wallet,
                                    balance : userDashboard.top_up_wallet - amount,
                                    pin : pin,
                                    status : "Loose",
                                    entry_time : entry_time,
                                    type: "7 Up Down Game",
                                    wallet : "winning_wallet"
                                }
                                let new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insertData);
                                new_seven_up_down_wallet_transactions.save(function(err, result) {
                                    if(err) console.log(err);
                                    console.log('LoseInserted');
                                    return res.send({
                                        is_win : is_win,
                                        status : status,
                                        winning_amount : 0,
                                        Msg : "You Lost"
                                    });
                                });
                            }).catch(function(error){
                                console.log(error);
                                res.json({status : false , error : error});
                            });
                        }).catch(function(error){
                            console.log(error);
                            res.json({status : false , error : error});
                        });
                    }
                }).catch(function(error){
                    console.log(error);
                    res.json({status : false , error : error});
                });
            }).catch(function(error){
                console.log(error);
                res.json({status : false , error : error});
            });        
        }).catch(function(error){
            console.log(error);
            res.json({status : false , error : error});
        });
    }).catch(function(error){
        console.log(error);
        res.json({status : false , error : error});
    });
}

module.exports.sevenUpDownTopup = sevenUpDownTopup;