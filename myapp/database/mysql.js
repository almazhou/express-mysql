mysql = require('mysql');
var connection = mysql.createConnection({
	user:'root',
	password:''
});
connection.query("use express_mysql");
module.exports = connection;