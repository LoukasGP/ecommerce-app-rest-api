CREATE TABLE users (
  id int,
  password char(50),
  email varchar(50),
  first_name varchar(50),
  last_name varchar(50),
  created TIMESTAMP,
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id int,
  total money,
  status varchar(30), -- this could be boolean as well
  user_id int,
  created TIMESTAMP,
  modified timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE product (
  id int,
  name varchar(100),
  description varchar(250),
  created TIMESTAMP,
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE order_item (
  id int,
  quantity int,
  price money,
  order_id int,
  product_id int,
  created TIMESTAMP,
  modified timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE cart (
  id int,
  created TIMESTAMP,
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE cart_item (
  product_id int,
  cart_id int,
  created  TIMESTAMP,
  modified timestamp,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (cart_id) REFERENCES cart(id)
);

