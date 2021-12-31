//notes form https://node-postgres.com/features/types

const { Client } = require('pg'); //Use a pool if you have or expect to have multiple concurrent requests. It is to provide a pool of re-usable open client instances (reduces latency whenever a client can be reused). https://stackoverflow.com/questions/48751505/how-can-i-choose-between-client-or-pool-for-node-postgres
const { DB } = require('./config');

(async () => { //everything needs to be async/await to get the database first, and then add the tables
    const userTable = `
    CREATE TABLE IF NOT EXISTS user (
        id int UNIQUE, 
        password VARCHAR(50),
        email VARCHAR(50),
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        created getData(),
        modified TIMESTAMP,
        PRIMARY KEY (id)
    );`
    // had to change id to char to make it so it would generate ids randomly 
    const orderTable = `
    CREATE TABLE IF NOT EXISTS order (
        id INT,
        total INT,
        status CHAR(3),
        user_id INT,
        created getDate(),
        modified TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT FK_order.user_id
          FOREIGN KEY (user_id)
            REFERENCES user(id)
      );`
    
      const productTable = `
      CREATE TABLE IF NOT EXISTS product (
        id INT,
        name VARCHAR(100),
        description VARCHAR(250),
        created getDate(),
        modified TIMESTAMP,
        PRIMARY KEY (id)
      );`
    
      const orderItemTable = `
      CREATE TABLE IF NOT EXISTS order_item (
        id INT,
        quantity INT,
        price money,
        order_id INT,
        product_id INT,
        created getDate(),
        modified TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT FK_order_item.order_id
          FOREIGN KEY (order_id) REFERENCES order(id),
        CONSTRAINT FK_order_item.product_id
          FOREIGN KEY (product_id) REFERENCES product(id)
      );`
    
      const cartTable = `
      CREATE TABLE IF NOT EXISTS cart (
        id INT,
        created getDate(),
        modified TIMESTAMP,
        PRIMARY KEY (id)
      );`
    
      const cartItemTable = `
      CREATE TABLE IF NOT EXISTS cart_item (
        product_id INT,
        cart_id INT,
        created getDate(),
        modified TIMESTAMP,
        CONSTRAINT FK_cart_item.product_id
          FOREIGN KEY (product_id)
            REFERENCES product(id),
        CONSTRAINT FK_cart_item.cart_id
          FOREIGN KEY (cart_id) REFERENCES cart(id)
      );`
    
      // connect to the database
      const database = new Client ({
        user: DB.PGUSER,
        host: DB.PGHOST,
        database: DB.PGDATABASE,
        password: DB.PGPASSWORD,
        port: DB.PGPORT, 
    });
      // query the data like this await client.query(createTableText)
      await database.query(userTable);
      await database.query(orderTable);
      await database.query(productTable);
      await database.query(orderItemTable);
      await database.query(cartTable);
      await database.query(cartItemTable);

      await database.end(err => { //Disconnects the client from the PostgreSQL server
        console.log('client has disconnected')
        if (err) {
          console.log('error during disconnection', err.stack)
        }
      })
})();



