use express_mysql;

create table pricing(
	id int primary key auto_increment,
	amount double not null,
	product_id int,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);