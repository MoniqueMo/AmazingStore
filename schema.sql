CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id int(30) not null auto_increment,
product_name VARCHAR(30) not null,
department_name VARCHAR(30) not null,
product_price DECIMAL(6,2) not null,
stock_quantity INT (20) not null,
primary key(id)
);

INSERT INTO products(product_name, department_name, product_price, stock_quantity)
VALUES ("Trek Bicycle", "Sports", 350.74, 35),
("Beat Headphones", "Electronics", 320.75, 40),
("Fender Guitar", "Music", 450.99, 30),
("CB2 Mug", "Kitchen Wear", 9.99, 300),
("Jansport Backpack", "Accessories", 39.99, 499),
("Coach Wallet", "Accessories", 36.50, 70),
("Apple Iphone", "Electronics", 299.99, 375),
("H&M Scarf", "Clothes", 14.99, 85),
("CB2 Bowls", "Kitchen Wear", 24.99, 75),
("Gloves", "Clothes", 10.99, 250);

SELECT * FROM products
