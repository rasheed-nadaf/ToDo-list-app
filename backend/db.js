const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_db',
    password: 'Sonu@web',
    port: 5432,
});

module.exports = pool;
