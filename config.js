//The following environment variables can be used to select default connection parameter values, which will be used by PQconnectdb, PQsetdbLogin and PQsetdb if no value is directly specified by the calling code. These are useful to avoid hard-coding database connection information into simple client applications, for example. 
// https://www.postgresql.org/docs/9.3/libpq-envars.html

module.exports = {
    PORT: process.env.port,
    DB: {
        PGHOST: process.env.PGHOST, //PGHOST behaves the same as the host connection parameter.
        PGUSER: process.env.PGUSER, //PGUSER behaves the same as the user connection parameter.
        PGDATABASE: process.env.PGDATABASE, //behaves the same as the dbname connection parameter
        PGPASSWORD: process.env.PGPASSWORD, //behaves the same as the password connection parameter
        PGPORT: process.env.PGPORT //behaves the same as the port connection parameter
    },
    SESSION_SECRET: process.env.SESSION_SECRET
} 

