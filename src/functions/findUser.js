const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function findUser(id, first_name, last_name, username, bot, msg) {
    try
    {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT first_name FROM public."User" WHERE username = ($1)';
        user = await database.query(queryUser, [username]);
        console.table(user.rows);
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
                        [{ text: "Ukraine\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Ukraine" }]
                    ]
                }
            });
             
            const firstName = msg.from.first_name;
            const secondName = msg.from.last_name;
            const username = msg.from.username;
            const messageDate = msg.date;
            const ChatId = msg.chat.id;
         
            database = new Client.Pool(DB);
            var insertFirstNameNewUser = 'INSERT INTO public."User" (first_name, last_name, username, personal_key, adress, phone) VALUES ($1, $2, $3, $4, $5, $6)';
           // inProcess = await database.query(insertFirstNameNewUser, [firstName, secondName, username, ChatId, 2, 0949520689 ]);    
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