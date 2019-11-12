DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods", "Electronics", 200, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitar", "Music", 400, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Pot", "Home & Kitchen", 200, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LEGO Hogwarts Castle", "Toys & Games", 400, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Toys & Games", 20, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 1000, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home & Kitchen", 50, 235);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batteries", "Electronics", 5, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Karaoke Machine", "Music", 250, 45);

