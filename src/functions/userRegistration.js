const DB = require("../connect_db")
const Client  = require('pg');
const bot = require("../bot") 

async function userRegistration(id, first_name, last_name, username, adress, phone) {
    try {
        database = new Client.Pool(DB)
        await database.connect()
        var queryUser = 'INSERT INTO User VALUES ($1, $2, $3, $4, $5, $6)'
        const user = await database.query(queryUser, [first_name], [last_name], [username], [id], [adress], [phone])
        console.table(user.rows)
        if(user.rows[0] != null) {
            bot.sendMessage(id, "Добро пожаловать, " + user.rows[0].username + "!", {
                parse_mode: "Markdown"
            });
        }
        else {
            bot.sendMessage(id, "Вы не зарегистрированы", {
                parse_mode: "Markdown"
            });

        }
    }
    catch (ex) 
    {
        console.log('Something wrong happend: ' + ex)
    }
    finally {
        await database.end()
        console.log("DB disconnect")
    }
}

module.exports.userRegistration = userRegistration