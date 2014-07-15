var request = require('supertest'),
should = require('should');
var app = require("../app");
var Pricing = require("../model/pricing");
request = request("http://localhost:3000");
describe("/GET",function(){

	beforeEach(function(done){
		Pricing.save({amount:56.0,product_id:1},done);
	});

	it("should return 200 when get all pricing",function(done){
		request
		.get("/products/1/pricings")
		.expect(200,function(err,res){
			var pricing = res.body[0];
			pricing.should.have.property("amount",56.0);
			pricing.should.have.property("id",1);
			pricing.should.have.property("uri","/products/1/pricings/1");
			done();
		});
	});

	it("should return 200 when get one pricing",function(done){
		request
		.get("/products/1/pricings/1")
		.expect(200,function(err,res){
			var pricing = res.body[0];
			pricing.should.have.property("amount",56.0);
			pricing.should.have.property("id",1);
			pricing.should.have.property("uri","/products/1/pricings/1");
			done();
		});
	});

	it("should return 404 when get one pricing which not exist",function(done){
		request
		.get("/products/1/pricings/100")
		.expect(404,done);
	});
	afterEach(function(done){
		Pricing.reset();
		done();
	});
});

describe("test /POST" ,function(){
	beforeEach(function(done){
		Pricing.reset();
		done();	
	});
	it("should return 201 for post one pricing",function(done){
		request
		.post("/products/1/pricings")
		.send({amount:56.0})
		.expect(201,function(err,res){
			var location = res.header.location;
			location.should.containEql("/products/1/pricings/1");
			done();
		});
	});

	afterEach(function(done){
		Pricing.reset();
		done();	
	});
});
