var connection = require("../database/mysql");

exports.save = function (create_params, callback){
	connection.query("INSERT INTO pricing SET ?",create_params,function(err,result){
		if(err){
			callback(err);
		}else{
			callback(null,result);
		}
	});
};

exports.findAllPricings = function (product_id,callback){
	connection.query("SELECT * FROM pricing where product_id = ?",product_id,function(err,result){
		if(!err){
			callback(null, result);
		}else{
			callback(err);
		}
	});
};

exports.findPricingById = function (product_id,pricing_id,callback){
	console.log("I am here now in find all pricing by id");
	connection.query("SELECT * FROM pricing where product_id = ? and id = ?",[product_id,pricing_id],function(err,result){
		if(!err){
			callback(null, result);
		}else{
			callback(err);
		}
	});
};


exports.reset = function (){
	connection.query("truncate pricing", function(err){
		if(err){
			console.log("error reset table");
		}else{
			console.log("success reset table");
		}
	});
};