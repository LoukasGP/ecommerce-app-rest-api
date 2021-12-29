const client = require('./database');

//query the database
(async () => {
    await client.connect();
    const result = await client.query(`select * from demo_table`);
    console.log(result.rows);
    client.end();
})();

//insert into the database
// (async () => {
//     await client.connect();
//     const result = await client.query(`insert into TABLE(name, address)
//         value($1, $2)`, ['technical', 'test test world']);
//     console.log(result.rows);
//     console.log(result.rowCount);
//     client.end();
// })();




