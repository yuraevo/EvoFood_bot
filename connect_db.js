const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "0822",
    host: "localhost",
    port: 5432,
    database: "evogusto"
})

// client.connect()
// .then(() => console.log("Connect successfuly"))
// .then(() => client.query("SELECT * FROM client"))
// .then((result => console.table(result.rows)))
// .catch(e => console.log)
// .finally(()=> client.end())

module.exports = client