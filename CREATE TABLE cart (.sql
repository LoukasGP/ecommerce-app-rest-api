CREATE TABLE cart (
  id int,
  customer_id int,
  PRIMARY KEY (id)
);

CREATE TABLE address (
  id int,
  customer_id int,
  name varchar(50),
  number varchar(50),
  streetname varchar(50),
  town varchar(50),
  city_id varchar(50),
  postcode varchar(50),
  last_update timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE city (
  id int,
  country_id int,
  city char(50),
  last_update timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE customer (
  id int,
  firstname varchar(30),
  lastname varchar(30),
  email varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE cart_products (
  product_id int,
  cart_id int
);

CREATE TABLE country (
  id int,
  country varchar(50),
  last_update timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id int,
  title varchar(50),
  description varchar(50),
  cost money,
  quantity int,
  PRIMARY KEY (id)
);

