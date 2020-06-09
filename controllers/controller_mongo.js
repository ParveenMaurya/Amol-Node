'use strict';

const validate = require('../libs/validateLib');
const isEmpty = require('../libs/checkLib');
const allModel = require('../libs/allModels');
var mongoose = require('mongoose');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

async function sevenUpDownTopup(req,res){
    const entry_time = new Date();
    const {error} = validate(req.body);
    // console.log(error);
    let user;
    let product,dashboard;
    if(error){
        res.json({status : 404,error : true,result : null, msg : "Invalid Parameters Passed"});
    }

    if(req.body.amount %10 !=0){
        res.json({status : 403,error : true,result : null, msg : "Amount Should be multipe of 10"});
    }


    await allModel.UsersModel.find({'user_id' : req.body.user_id}).then(function(result) {
        if(isEmpty(result)){
            res.json({status : 404,error : true,result : null, msg : "User not found"});
        }else{
            
            user = result[0];
            // console.log(user);            
            var id = new mongoose.Types.ObjectId(req.body.product_id);
           allModel.ProductGameUpdown.find({'_id' : id}).then(function(result) {
                if(isEmpty(result)){
                    res.json({status : 404,error : true,result : null, msg : "Product not found"});
                }else{
                    product = result[0];
                    // var userid = new mongoose.Types.ObjectId(user._id);
                    // console.log(user[0]._id);
                     allModel.DashboardModel.find({'id' : user.id}).then(function(result) {
                        if(isEmpty(result)){
                            res.json({status : 404,error : true,result : null, msg : "Dashboard data not found"});
                        }else{
                            dashboard = result[0];
                            // console.log(dashboard.winning_wallet,'dashboard');
                            let topup_balance = dashboard.top_up_wallet - dashboard.top_up_wallet_withdraw;
                            // console.log(dashboard.winning_wallet_withdraw,dashboard.winning_wallet);
                            let winning_balance = parseInt(dashboard.winning_wallet) - parseInt(dashboard.winning_wallet_withdraw);
                            // console.log(winning_balance, 'winning_balance',);
                            let amount = req.body.amount;

                            if(amount > topup_balance){
                                res.json({status : 403,error : true,result : null,msg : "Insufficient balance"});
                            }

                            let product_name = product.name;
                            let product_name_arr = product_name.split("-");

                            let no1 = parseInt(product_name_arr[0]);
                            if(product_name_arr.length > 1){
                                let no2 = product_name_arr[1];
                            }else{
                                let no2 = no1;
                            }
                            let is_win = 0;
                            let is_random = 0;
                            let pin = getRndInteger(1111111111,9999999999);
                            let winning_amount = amount * product.winning_amount;
                            let type = "Credit";

                            updateAdminBalanceEntry(user.id,type,amount,pin,(err,result)=>{
                                // Previous it was {status : 1}
                                allModel.ProjectSettingModel.find({"project_name" : "Sadda Adda"}).then(function(result) {
                                    // console.log(result,"Project Setting");
                                    let project_settings = result[0];
                                    let loss = project_settings.loss;
                                    let profit = project_settings.profit;

                                    let sevenudadmin_wallet = dashboard.sevenudadmin_wallet;
                                    let sevenudadmin_wallet_withdraw = dashboard.sevenudadmin_wallet_withdraw;
                                    let admin_balance = sevenudadmin_wallet - sevenudadmin_wallet_withdraw;
                                    loss = -loss;
                                    // console.log(admin_balance, loss,"admin_balance----lossAmount");
                                    if(admin_balance <= loss ){
                                        is_win = 0;
                                    }
                                    if(admin_balance >= profit){
                                        is_win = 1;
                                    }
                                    if(admin_balance > loss && admin_balance < profit){
                                        is_random = 1;
                                    }
                                    if(is_random == 1){
                                        is_win = getRndInteger(0,2);
                                    }

                                    if(is_win == 1){
                                        console.log('in win');
                                        let status = 'Win';
                                        type = "Debit";
                                        updateAdminBalanceEntry(user.id,type,winning_amount,pin,(err,result)=>{
                                            if(result){
                                                afterSettingDB(winning_balance,user,product,pin,amount,winning_amount,status,entry_time,topup_balance,type,(err,result)=>{
                                                    if(result){
                                                        res.json({data : result});
                                                    }
                                                });
                                            }
                                        });
                                    }else{
                                        console.log('in loose');
                                        let status = 'Lose';
                                        let winning_amount = 0;
                                        // console.log(winning_balance,'winning_balance');
                                        afterSettingDB(winning_balance,user,product,pin,amount,winning_amount,status,entry_time,topup_balance,type,(err,result)=>{
                                            // console.log(result,"aftersetting");
                                            if(result){
                                                res.json({data : result});
                                            }
                                        });
                                    }
                                }).catch(function(error){
                                    console.log(error);
                                    res.json({status : false , error : error});
                                });

                            });
                        }
                    }).catch(function(error){
                        console.log(error);
                        res.json({status : false , error : error});
                    });
                }
            }).catch(function(error){
                console.log(error);
                res.json({status : false , error : error});
            });
            
        }
    }).catch(function(error){
        console.log(error);
        res.json({status : false , error : error});
      });
   
}

async function afterSettingDB(winning_balance,user,product,pin,amount,winning_amount,status,entry_time,topup_balance,type,cb){
    let topup_arr = {
        id : user.id,
        type : product.id,
        pin : pin,
        amount : amount,
        winning_amount : winning_amount,
        top_up_by : user.id,
        status : status,
        entry_time : entry_time
    }
    var new_topupGameUpdown = new allModel.TopupGameUpdown(topup_arr);
    await new_topupGameUpdown.save(function(err, result) {
        if(err){
            console.log('aftersetting error');
            console.log(err);
        }
        // console.log(result);
        let debit_balance = topup_balance;
        inserWalletTransaction(entry_time,user,user.id,pin,amount,'7 Up Down Game','Debit',debit_balance,'Amount '+amount+" invested in 7 Up Down Game ",'seven_up_down','topup_wallet',status,(err,result)=>{
            let update_dash = {};
            // console.log(result,'insertWalletFunction Call');
            update_dash.servenupdown_income = amount;
            let credit_balance = winning_balance;
            inserWalletTransaction(entry_time,user,user.id,pin,winning_amount,'7 Up Down Game',"Credit",credit_balance,"Winning Amount "+winning_amount+" Created in wallet", 'seven_up_down', 'winning_wallet', status,(err,result)=>{
                // console.log(result,'insertWalletFunction Call again');
                update_dash.total_investment = amount;
                update_dash.active_investment = amount;
                update_dash.winning_wallet = winning_amount;

                var searchArray = new Object();
                searchArray['id'] = user.id;
                allModel.DashboardModel.updateOne(searchArray,update_dash).then(function(result) {
                    // if(err) console.log(err,"error");
                        // console.log(result,"result");

                    if(!isEmpty(result)){

                        allModel.DashboardModel.find({'id' : user.id}).then(function(result) {
                            // console.log(result,'dash find by id');                            
                            if(!isEmpty(result)){
                                let dashboard = result[0];
                                // console.log(dashboard,'dash find by id result');                            

                                topup_balance = parseInt(dashboard.top_up_wallet) - parseInt(dashboard.top_up_wallet_withdraw);
                                winning_balance = parseInt(dashboard.winning_wallet) - parseInt(dashboard.winning_wallet_withdraw);
                                // console.log(topup_balance,winning_balance,'topup_balance--winning_balance');

                                var searchRec = new Object();
                                searchRec['pin'] = pin;
                                allModel.SevenUpDownWalletTransactionModel.updateOne(searchRec,{"status" : status}).then(function(result) {
                                    // console.log(result);

                                    allModel.DashboardModel.find({'id' : "1"}).then(function(result) {
                                        // console.log(result,"dashboa:ById");
                                        if(!isEmpty(result)){
                                            dashboard = result[0];
                                            let admin_balance = parseInt(dashboard.sevenudadmin_wallet) - parseInt(dashboard.sevenudadmin_wallet_withdraw);
                                            // console.log(dashboard.sevenudadmin_wallet,dashboard.sevenudadmin_wallet_withdraw,"sevenudadmin_wallet--sevenudadmin_wallet_withdraw");
                                            let OutputArr = {
                                                user_id : user.user_id,
                                                product_name : product.name,
                                                pin : pin,
                                                status : status,
                                                winning_amount : winning_amount,
                                                top_up_wallet_balance : topup_balance,
                                                winning_wallet_balance : winning_balance,
                                                admin_balance : admin_balance
                                            }
                                            cb(false,OutputArr);
                                        }
                                    }).catch(function(error){
                                        console.log(error);
                                        cb({status : false , error : error});
                                    });
                                }).catch(function(error){
                                    console.log(error);
                                    cb({status : false , error : error});
                                });
                            }
                        }).catch(function(error){
                            console.log(error);
                            cb({status : false , error : error});
                        });
                    }
                }).catch(function(error){
                    console.log(error);
                    cb({status : false , error : error});
                });

            });
                
        });
    });
}

async function inserWalletTransaction(entry_time,user,user_id, pin, amount, type, tr_type, prev_balance, remark, table_name,wallet, status = null,cb){
    let balance;
    if(tr_type=="Credit"){
        balance = prev_balance + amount;
    }else{
        balance = prev_balance - amount;
    }
    var insert_transaction_array = {
        user_id : user_id,
        userid : user.id,
        fullname : user.fullname,
        amount : amount,
        pin :pin,
        type : type,
        wallet : wallet,
        tr_type: tr_type,
        prev_balance : prev_balance,
        balance : balance,
        remark : remark,
        status :status,
        entry_time: entry_time
    }

    if(table_name == "seven_up_down"){
        // console.log(table_name);
        var new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insert_transaction_array);
       await new_seven_up_down_wallet_transactions.save(function(err, result) {
            if(result){
                // console.log(result);
                cb(false,true);
            }else{
                console.log(err);
            }
        });
    }else if(table_name == "zero_to_nine"){
        // console.log(table_name);
        var new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insert_transaction_array);
       await new_seven_up_down_wallet_transactions.save(function(err, result) {
            if(result){
                // console.log(result);
                cb(false,true);
            }else{
                console.log(err);
            }
        });
    }else if(table_name == "damdar_shatak"){
        console.log(table_name);
        delete insert_transaction_array.wallet;

        var new_damdar_shatak_wallet_transaction = new allModel.DamdarShatakWalletTransactionModel(insert_transaction_array);
      await  new_seven_up_down_wallet_transactions.save(function(err, result) {
            if(result){
                // console.log(result);
                cb(false,true);
            }else{
                console.log(err);
            }
        });
    }else if(table_name == "admin_fund"){
        // console.log(table_name);
        var new_admin_fund_wallet_transaction = new allModel.AdminFundWalletTransactionModel(insert_transaction_array);
       await new_admin_fund_wallet_transaction.save(function(err, result) {
            if(result){
                // console.log(result);
                cb(false,true);
            }else{
                console.log(err);
            }
        }).catch(function(error){
            console.log(error);
            cb({status : false , error : error});
        });
    }else if(table_name == "buy_sell"){
        // console.log(table_name);
        var new_buySellWalletTransaction = new allModel.BuySellWalletTransaction(insert_transaction_array);
       await new_buySellWalletTransaction.save(function(err, result) {
            if(result){
                // console.log(result);
                cb(false,true);
            }else{
                console.log(err);
            }
        });
    }  
}

async function updateAdminBalanceEntry(user_id,type,amount,pin,cb){
    await  allModel.DashboardModel.find({'id' : user_id}).then(function(result) {
        // console.log(result);
        let user = result;
        // console.log(user);
         allModel.DashboardModel.find({'id' : '1'}).then(function(result) {
            // console.log(result,'dddddddddddddd');
            let dashboard = result;
            let prev_balance = parseInt(dashboard.sevenudadmin_wallet) - parseInt(dashboard.sevenudadmin_wallet_withdraw);
            if(type == "Debit"){
                var searchArray = new Object();
                searchArray['id'] = 1;
                allModel.DashboardModel.updateOne(searchArray,{"sevenudadmin_wallet_withdraw" : amount}).then(function(result) {
                    // console.log('inside debit');
                    // console.log(user);
                    let admin_balance = parseInt(dashboard.sevenudadmin_wallet) - parseInt(dashboard.sevenudadmin_wallet_withdraw);
                    let insert_wallet_balance = {
                        user_id : user_id,
                        userid : user.user_id,
                        fullname : user.fullname,
                        tr_type : type,
                        amount : amount,
                        prev_balance : prev_balance,
                        balance : admin_balance,
                        pin : pin
                    }

                    var new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insert_wallet_balance);
                    new_seven_up_down_wallet_transactions.save(function(err, result) {
                        if(err){
                            console.log('err');
                            console.log(err);
                        }
                        // console.log(result);
                        if(result){
                            cb(false,true);
                        }
                    })
                });
            }else if(type == "Credit"){
                var searchArray = new Object();
                searchArray['id'] = 1;
                allModel.DashboardModel.updateOne(searchArray,{"sevenudadmin_wallet_withdraw" : amount}).then(function(result) {
                    // console.log('inside credit');
                    // console.log(user);
                    let admin_balance = parseInt(dashboard.sevenudadmin_wallet) - parseInt(dashboard.sevenudadmin_wallet_withdraw);
                    let insert_wallet_balance = { 
                        user_id : user_id,
                        userid : user.user_id,
                        fullname : user.fullname,
                        tr_type : type,
                        amount : amount,
                        prev_balance : prev_balance,
                        balance : admin_balance,
                        pin : pin
                    }
                    // sql.query("insert into tbl_seven_up_down_wallet_transactions set ?",insert_wallet_balance,(err,result)=>{
                    var new_seven_up_down_wallet_transactions = new allModel.SevenUpDownWalletTransactionModel(insert_wallet_balance);
                    new_seven_up_down_wallet_transactions.save(function(err, result) {
                        if(err){
                            console.log('error');
                            console.log(err);
                        }
                        console.log('in insert');
                        // console.log(result);
                        if(result){
                            cb(false,true);
                        }
                    });
                }).catch(function(error){
                    console.log(error);
                    cb({status : false , error : error});
                });
            }
        }).catch(function(error){
            console.log(error);
            cb({status : false , error : error});
        });
    }).catch(function(error){
        console.log(error);
        cb({status : false , error : error});
    });
}

module.exports.sevenUpDownTopup = sevenUpDownTopup;
