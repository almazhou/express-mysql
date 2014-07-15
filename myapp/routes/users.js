var express = require('express');
var Order = require('../model/order');
var Payment = require('../model/payment');
var router = express.Router();

router.get('/:id/orders', function(req, res) {
 	Order.findAllOrders(req.params.id, function (err,result){
 		var resultJson = result.map(function(order){
 			return {
 				uri: "/users/"+order.user_id+"/orders/"+order.id,
 				total_cost : order.total_cost,
 				user_id : order.user_id,
 				date : order.date
 			};
 		});
 		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(resultJson));
 	});	 
});

router.get('/:user_id/orders/:order_id/payment', function(req, res) {
 	Payment.findAllPayment(req.params.user_id,req.params.order_id, function (err,result){
 		var resultJson = result.map(function(payment){
 			return {
 				uri: "/users/"+payment.user_id+"/orders/"+payment.order_id + "/payment",
 				amount : payment.amount,
 				user_id : payment.user_id,
 				order_id : payment.order_id,
 				date : payment.date
 			};
 		});
 		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(resultJson));
 	});	 
});

router.post('/:user_id/orders/:order_id/payment', function(req, res) {
	var payment_params = {
		user_id: req.params.user_id,
		order_id: req.params.order_id,
		amount: req.body.amount
	};
	Payment.save(payment_params, function(err, result){
		if(!err){
		res.location("/users/"+req.params.user_id+"/orders/"+req.params.order_id + "/payment");
		return res.send(201);
	}
	});
 		 
});

router.post('/:id/orders', function(req, res) {
 	var order_param = {
		total_cost: req.body.total_cost,
		user_id: req.params.id
	};
	Order.save(order_param, function(err, result){
		if(!err){
		res.location("/users/"+req.params.id+"/orders/"+result.insertId);
		return res.send(201);
	}
	}); 
});


router.get('/:user_id/orders/:order_id', function(req, res) {
 	Order.findOrderById(req.params.user_id,req.params.order_id, function (err,result){
 		var resultJson = result.map(function(order){
 			return {
 				uri: "/users/"+order.user_id+"/orders/"+order.id,
 				total_cost : order.total_cost,
 				user_id : order.user_id,
 				date : order.date
 			};
 		});
 		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(resultJson));
 	});	 
});


module.exports = router;
