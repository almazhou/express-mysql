use express_mysql;

create table payment(
	id int primary key auto_increment,
	amount double not null,
	order_id int,
	user_id int,
	date DATETIME DEFAULT CURRENT_TIMESTAMP
);