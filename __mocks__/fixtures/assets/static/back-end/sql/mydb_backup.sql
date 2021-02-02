Create database if not exists mydb;
-- SQL for the Cars table

USE mydb;
CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, Name VARCHAR(50), 
Cost INTEGER);
INSERT INTO Cars VALUES(1,'Audi',52642);
INSERT INTO Cars VALUES(2,'Mercedes',57127);
INSERT INTO Cars VALUES(3,'Skoda',9000);
INSERT INTO Cars VALUES(4,'Volvo',29000);
INSERT INTO Cars VALUES(5,'Bentley',350000);
INSERT INTO Cars VALUES(6,'Citroen',21000);
INSERT INTO Cars VALUES(7,'Hummer',41400);
INSERT INTO Cars VALUES(8,'Volkswagen',21600);
-- SQL for the Customers, Reservations tables

USE mydb;

CREATE TABLE IF NOT EXISTS Customers(CustomerId INTEGER AUTO_INCREMENT 
    PRIMARY KEY, Name VARCHAR(55));
INSERT INTO Customers(Name) VALUES('Paul Novak');
INSERT INTO Customers(Name) VALUES('Terry Neils');
INSERT INTO Customers(Name) VALUES('Jack Fonda');
INSERT INTO Customers(Name) VALUES('Tom Willis');

CREATE TABLE IF NOT EXISTS Reservations(Id INTEGER AUTO_INCREMENT
    PRIMARY KEY, CustomerId INTEGER, Day DATE);
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-22');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-28');
INSERT INTO Reservations(CustomerId, Day) VALUES(2, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(1, '2009-11-29');
INSERT INTO Reservations(CustomerId, Day) VALUES(3, '2009-12-2');
-- SQL for the Books table

USE mydb;

CREATE TABLE IF NOT EXISTS Books(Id INTEGER PRIMARY KEY, 
    Title VARCHAR(100), Author VARCHAR(60));
INSERT INTO Books VALUES(1,'War and Peace','Leo Tolstoy');
INSERT INTO Books VALUES(2,'The Brothers Karamazov','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(3,'Paradise Lost','John Milton');
INSERT INTO Books VALUES(4,'Crime and Punishment','Fyodor Dostoyevsky');
INSERT INTO Books VALUES(5,'Cousin Bette','Honore de Balzac');