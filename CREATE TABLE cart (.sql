CREATE TABLE user (
  id int,
  password varchar(50),
  email varchar(50),
  first_name varchar(50),
  last_name varchar(50),
  created getData(),
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE order (
  id int,
  total int,
  status char(3),
  user_id int,
  created getDate(),
  modified timestamp,
  PRIMARY KEY (id),
  CONSTRAINT FK_order.user_id
    FOREIGN KEY (user_id)
      REFERENCES user(id)
);

CREATE TABLE product (
  id int,
  name varchar(100),
  description varchar(250),
  created getDate(),
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE order_item (
  id int,
  quantity int,
  price money,
  order_id int,
  product_id int,
  created getDate(),
  modified timestamp,
  PRIMARY KEY (id),
  CONSTRAINT FK_order_item.order_id
    FOREIGN KEY (order_id)
      REFERENCES order(id),
  CONSTRAINT FK_order_item.product_id
    FOREIGN KEY (product_id)
      REFERENCES product(id)
);

CREATE TABLE cart (
  id int,
  created getDate(),
  modified timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE cart_item (
  product_id int,
  cart_id int,
  created getDate(),
  modified timestamp,
  CONSTRAINT FK_cart_item.product_id
    FOREIGN KEY (product_id)
      REFERENCES product(id),
  CONSTRAINT FK_cart_item.cart_id
    FOREIGN KEY (cart_id)
      REFERENCES cart(id)
);

