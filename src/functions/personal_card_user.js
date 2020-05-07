const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function personalCardUser(id, first_name, last_name, username, bot, msg) {
    try
    {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT * FROM public."User" WHERE username = ($1)';
        user = await database.query(queryUser, [username]);
        console.table(user.rows);
        if(user.rows[0] != null) {

            CARD = `
<strong>Вы зарегестрированы\uD83D\uDE4C 
Ваши данные, <b>${first_name}</b>: </strong>
                                    
<strong>\uD83D\uDD11 Персональный ключ: </strong> <i>${id}</i>
<strong>\uD83D\uDD74 Имя: </strong><i>${first_name}</i>
<strong>\uD83D\uDD74 Фамилия: </strong><i>${last_name}</i>
<strong>\uD83D\uDCF1 Телефон: </strong><i>${user.rows[0].phone}</i>
<strong>\uD83D\uDDFA Адрес: </strong><i>${user.rows[0].adress}</i>`;

        //<strong>\uD83C\uDF81Бонусы: </strong><i>${user.bonus}</i>
        //<strong>\uD83D\uDCC5Дата рождения: </strong><i>${user.date_of_birthday}</i>
        //<strong>\uD83D\uDC6DПриглашенные друзья: </strong><i>${user.invitation}</i>

            bot.sendDocument(id, "img/card.gif", {
                parse_mode: "HTML",
                caption: CARD
            })

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
             
            // const firstName = msg.from.first_name;
            // const secondName = msg.from.last_name;
            // const username = msg.from.username;
            // const messageDate = msg.date;
            // const ChatId = msg.chat.id;
         
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

module.exports.personalCardUser = personalCardUser;