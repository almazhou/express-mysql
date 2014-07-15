create table orders(
	id int primary key auto_increment,
	total_cost double not null,
	user_id int,
	date DATETIME DEFAULT CURRENT_TIMESTAMP
);