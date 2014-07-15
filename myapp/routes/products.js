var express = require('express');
var Product = require("../model/product");
var router = express.Router();

router.get('/', function (req, res) {
  	Product.all (function (err,result){
  		return err? res.send(500) : res.send(result);
  	})
});

module.exports = router;