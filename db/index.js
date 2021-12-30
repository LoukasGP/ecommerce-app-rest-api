const { Pool } = require('pg')
const { DB } = require('../config')

/**
 * Created a new pool to access the environment variables
 */

const pool = new Pool ({
    user: DB.PGUSER,
    host: DB.PGHOST,
    database: DB.PGDATABASE,
    password: DB.PGPASSWORD,
    port: DB.PGPORT,
});

module.exports = pool