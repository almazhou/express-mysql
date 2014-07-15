#!/bin/bash

mysql -u root -e "drop database express_mysql"
mysql -u root -e "create database express_mysql"
mysql -u root -e "use express_mysql"
mysql -u root < product.sql
mysql -u root < pricing.sql
mysql -u root < order.sql
mysql -u root < payment.sql