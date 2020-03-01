const { Client } = require('pg');
const SEQURITY_INFORMATION = require("./token")

const client = {
    user: SEQURITY_INFORMATION.USER,
    password: SEQURITY_INFORMATION.PASSWORD,
    host: SEQURITY_INFORMATION.HOST,
    port: SEQURITY_INFORMATION.PORT,
    database: SEQURITY_INFORMATION.DATABASE
}

module.exports = client