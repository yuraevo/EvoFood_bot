const DB = require("../connect_db")
const Client  = require('pg');
const bot = require("../bot") 
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")

async function findUser(id, first_name, last_name, username) {
    try {
        console.log("Зашло в findUser")
        database = new Client.Pool(DB)
        var queryUser = 'SELECT username FROM public."User" WHERE username = ($1)'
        const user = await database.query(queryUser, [username])
        console.table(user.rows)
        if(user.rows[0] != null) {
            bot.sendMessage(id, "Добро пожаловать, " + user.rows[0].username + "!", {
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
                        [{ text: "Ukraine", callback_data: "1" }]
                    ]
                }
            });

            //registration.userRegistration(id, first_name, last_name,)
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