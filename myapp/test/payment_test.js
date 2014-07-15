var request = require('supertest'),
should = require('should');
var app = require("../app");
var Payment = require("../model/payment");
request = request("http://localhost:3000");
describe("/GET",function(){

	beforeEach(function(done){
		Payment.save({amount:56.0,user_id:1,order_id:1},done);
	});

	it("should return 200 when get payment of one order",function(done){
		request
		.get("/users/1/orders/1/payment")
		.expect(200,function(err,res){
			var payment = res.body[0];
			payment.should.have.property("amount",56.0);
			payment.should.have.property("user_id",1);
			payment.should.have.property("order_id",1);
			done();
		});
	});
	afterEach(function(done){
		Payment.reset();
		done();
	});
});


