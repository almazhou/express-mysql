var express = require('express');
var Product = require("../model/product");
var Pricing = require("../model/pricing");
var router = express.Router();

router.get('/', function (req, res) {
  	Product.all (function (err,result){
  		var resultJson = result.map(function(product){
 			return {
 				uri: "/products/"+product.id,
 				id: product.id,
 				name : product.name,
 				current_price : product.price
 			};
 		});
  		return err? res.send(500) : res.send(resultJson);
  	});
});

router.post('/', function (req, res) {
	var product_params = {
		name : req.body.name,
		price: req.body.price
	}
  	Product.save(product_params,function (err,result){
  		if(err) return res.send(500);
  		res.location("/products/"+result.insertId);
  		return res.send(201);
  	});
});

router.get('/:id', function (req, res) {
  	Product.findById (req.params.id, function (err,result){
  		var resultJson = result.map(function(product){
 			return {
 				uri: "/products/"+product.id,
 				id: product.id,
 				name : product.name,
 				current_price : product.price
 			};
 		});
  		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(resultJson));
  	})
});

router.get('/:id/pricings', function (req, res) {
  	Pricing.findAllPricings (req.params.id, function (err,result){
  		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(result));
  	})
});

router.post('/:id/pricings', function (req, res) {
  	var pricing_param = {
		amount: req.body.amount,
		product_id: req.params.id
	}

	Pricing.save(pricing_param, function(err, result){
		if(!err){
		res.location("/products/1/pricings/"+result.insertId);
		return res.send(201);
	}
	});
});



router.get('/:product_id/pricings/:pricing_id', function (req, res) {
  	Pricing.findPricingById (req.params.product_id,req.params.pricing_id, function (err,result){
  		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(result));
  	})
});


module.exports = router;