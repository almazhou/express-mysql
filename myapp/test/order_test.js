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

	it("should return 200 when get one order",function(done){
		request
		.get("/users/1/orders/1")
		.expect(200,function(err,res){
			var order = res.body[0];
			order.should.have.property("total_cost",56.0);
			order.should.have.property("user_id",1);
			done();
		});
	});

	it("should return 404 when get one order failed",function(done){
		request
		.get("/users/1/orders/1000")
		.expect(404,done);
	});
	afterEach(function(done){
		Order.reset();
		done();
	});
});

describe("test /POST" ,function(){
	beforeEach(function(done){
		Order.reset();
		done();	
	});
	it("should return 201 for post one pricing",function(done){
		request
		.post("/users/1/orders")
		.send({total_cost: 54.0})
		.expect(201,function(err,res){
			var location = res.header.location;
			location.should.containEql("/users/1/orders/1");
			done();
		})
	});

	afterEach(function(done){
		Order.reset();
		done();	
	});
});

