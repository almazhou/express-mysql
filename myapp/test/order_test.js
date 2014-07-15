var request = require('supertest');
var should = require('should');
var app = require("../app");
var Order = require("../model/order");
request = request("http://localhost:3000");

describe("/GET",function(){

	beforeEach(function(done){
		Order.save({total_cost:56.0,user_id:1},done);
	});

	it("should return 200 when get all orders",function(done){
		request
		.get("/users/1/orders")
		.expect(200,function(err,res){
			var order = res.body[0];
			order.should.have.property("total_cost",56.0);
			order.should.have.property("user_id",1);
			done();
		});
	});
	afterEach(function(done){
		Order.reset();
		done();
	});
});