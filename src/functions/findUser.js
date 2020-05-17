const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function findUser(id, first_name, last_name, username, bot, msg) {
    try {
        database = new Client.Pool(DB);
        var queryUser = `SELECT first_name 
                        FROM public."User" WHERE username = ($1)`; //поиск юзера в базе
        user = await database.query(queryUser, [username]); //запрос юзера в базе
        console.table(user.rows); //вывод юзера
        if(user.rows[0] != null) { //если есть, добро пожаловать
            bot.sendDocument(id, "img/privet.gif", {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: keyboards.personal_accaunt
                },
                caption: `<strong>🍳Добро пожаловать, ${user.rows[0].first_name} 🧡</strong> \n\nРады ощущать отклик Ваших пальцев на экране! Выберите, что Вас интересует!`
            });
        }
        else {      
            var TEXT = `<strong>${first_name}, выберите пожалуйста страну, где вы живете ⤵</strong>`
            var query = `SELECT name_country 
                        FROM public."Country"`; //запрос на список стран
            country = await database.query(query); //список стран
            var opts = { inline_keyboard: [] };
            country.rows.forEach(element => {
                opts.inline_keyboard.push(
                    [
                        {text: element.name_country, callback_data: `Выб. страна: ${element.name_country}` }
                    ]);
            }); 
            bot.sendMessage(id, TEXT, { //вывести страны в бот
                parse_mode: "HTML",
                reply_markup: opts
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