--create the database
CREATE DATABASE crudnodejsmysql;

-- using the database
use crudnodejsmysql;

--creating a table
--UNSIGNED MEANS NO NEGATIVE NUMBERS 
CREATE TABLE customer (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

--to show all tables
SHOW TABLES;

--to describe the table
describe customer;

--WE COPY ALL THIS TEXT AND PASTE IT IN THE TERMINAL
--in terminal: select * from customer;