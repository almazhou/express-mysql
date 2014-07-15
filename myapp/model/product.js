var connection = require("../database/mysql");

exports.save = function (create_params, callback){
	connection.query("INSERT INTO product SET ?",create_params,function(err,result){
		if(err){
			callback(err);
		}else{
			callback(null,result);
		}
	});
};

exports.all = function (callback){
	connection.query("SELECT * FROM product",function (err,result){
		if(err){
			callback(err);
		}else{
			callback(null,result);
		}
	});
};

exports.findById = function (id,callback){
	connection.query("SELECT * FROM product where id = ?" , id, function (err,result){
		return err? callback(err) : callback(null, result);
	});
};

exports.reset = function (){
	connection.query("truncate product", function(err){
		if(err){
			console.log("error reset table");
		}else{
			console.log("success reset table");
		}
	});
};

