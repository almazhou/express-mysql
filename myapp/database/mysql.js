mysql = require('mysql');
var connection = mysql.createConnection({
	user:'root',
	password:''
});
connection.query("use express");
module.exports = connection;