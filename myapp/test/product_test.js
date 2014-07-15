var request = require('supertest'),
should = require('should');
var app = require("../app");
var Product = require("../model/product");
request = request("http://localhost:3000");

describe("/GET",function(){

	beforeEach(function(done){
		Product.save({name:"zhouxuan"},done);
	});

	it("should return 200 when get all products",function(done){
		request
		.get("/products")
		.expect(200,function(err,res){
			var product = res.body[0];
			product.should.have.property("name","zhouxuan");
			product.should.have.property("id",1);
			done();
		});
	});

	it("should return 200 when get one product",function(done){
		request
		.get("/products/1")
		.expect(200,function(err,res){
			var product = res.body[0];
			product.should.have.property("name","zhouxuan");
			product.should.have.property("id",1);
			done();
		});
	});

	it("should return 404 when get one product failed",function(done){
		request
		.get("/products/500")
		.expect(404,done);
	});

	afterEach(function(done){
		Product.reset();
		done();
	});
});

