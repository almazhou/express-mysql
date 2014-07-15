use express_mysql;

create table orders(
	id int primary key auto_increment,
	total_cost double not null,
	user_id int,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);