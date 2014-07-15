var connection = require("../database/mysql");

exports.save = function (create_params, callback){
	connection.query("INSERT INTO payment SET ?",create_params,function(err,result){
		if(err){
			callback(err);
		}else{
			callback(null,result);
		}
	});
};

exports.findAllPayment = function (user_id,order_id,callback){
	connection.query("SELECT * FROM payment where user_id = ? and order_id = ?",[user_id,order_id],function(err,result){
		if(!err){
			callback(null, result);
		}else{
			callback(err);
		}
	});
};
exports.reset = function (){
	connection.query("truncate payment", function(err){
		if(err){
			console.log("error reset table");
		}else{
			console.log("success reset table");
		}
	});
};