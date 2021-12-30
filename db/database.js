

const { Client } = require('pg');

const client = new Client ({
    host: "ec2-52-18-185-208.eu-west-1.compute.amazonaws.com",
    port: 5432,
    user: "utqvdqfxmbrgoj",
    password: "c8c429716e4e3aeb3a432e744c112269c2df13900930e8ed3ff4957bba093cb4",
    database: "dd2i1505h2epku",
    ssl: "off"
});



client.on("connect", () => {
    console.log("database connected")
});

client.on("end", () => {
    console.log("connection ended")
});





module.exports = client