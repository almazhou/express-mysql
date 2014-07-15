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
			done();
		});
	});

	afterEach(function(done){
		Pricing.reset();
		done();
	});
});
