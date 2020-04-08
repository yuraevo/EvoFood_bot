const DB = require("../connect_db")
const Client  = require('pg');
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")

async function findUser(id, first_name, last_name, username, bot) {
    try
    {
        database = new Client.Pool(DB)
        var queryUser = 'SELECT first_name FROM public."User" WHERE username = ($1)'
        user = await database.query(queryUser, [username])
        console.table(user.rows)
        if(user.rows[0] != null) {
            bot.sendMessage(id, "Добро пожаловать, " + user.rows[0].first_name + "!", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: keyboards.personal_accaunt
                }
            });
        }
        else {
            bot.sendMessage(id, text.choiseCountry, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard:
                    [
                        [{ text: "Odessa\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Odessa" }]
                    ]
                }
            });
        }
    }
    catch(ex){
        console.log('Something wrong happend - ' + ex)
    }
    finally{
        await database.end()
        console.log("DB disconnect findUser")
    }
    
}

module.exports.findUser = findUser;