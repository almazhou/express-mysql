var express = require('express');
var Order = require('../model/order');
var router = express.Router();

/* GET users listing. */
router.get('/:id/orders', function(req, res) {
 	Order.findAllOrders(req.params.id, function (err,result){
 		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(result));
 	})	 
});

router.get('/:user_id/orders/:order_id', function(req, res) {
 	Order.findOrderById(req.params.user_id,req.params.order_id, function (err,result){
 		return err? res.send(500) : (result.length === 0 ? res.send(404) : res.send(result));
 	})	 
});

module.exports = router;
