const DB = require("../connect_db")
const Client  = require('pg');
const bot = require("../bot") 
const registration = require("./userRegistration")

async function findUser(id, first_name, last_name, username) {
    try {
        database = new Client.Pool(DB)
        var queryUser = 'SELECT username FROM public."User" WHERE username = ($1)'
        const user = await database.query(queryUser, [username])
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
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
        console.log("DB disconnect")
    }
}

module.exports.findUser = findUser;