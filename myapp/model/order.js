var connection = require("../database/mysql");

exports.save = function (create_params, callback){
	connection.query("INSERT INTO orders SET ?",create_params,function(err,result){
		if(err){
			callback(err);
		}else{
			callback(null,result);
		}
	});
};

exports.findAllOrders = function (user_id,callback){
	connection.query("SELECT * FROM orders where user_id = ?",user_id,function(err,result){
		if(!err){
			callback(null, result);
		}else{
			callback(err);
		}
	});
};

exports.findOrderById = function (user_id,order_id,callback){
	connection.query("SELECT * FROM orders where user_id = ? and id = ?",[user_id,order_id],function(err,result){
		if(!err){
			callback(null, result);
		}else{
			callback(err);
		}
	});
};



exports.reset = function (){
	connection.query("truncate orders", function(err){
		if(err){
			console.log("error reset table");
		}else{
			console.log("success reset table");
		}
	});
};