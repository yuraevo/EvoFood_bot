const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function personalCardUser(id, first_name, last_name, username, bot, msg) {
    try {
        database = new Client.Pool(DB);
        var queryUser =  `SELECT 
            public."User".personal_key,
            public."User".first_name, 
            public."User".last_name, 
            public."User".username, 
            public."User".phone,
            public."Adress".street,
            bonus, 
            count_friend, 
            start_date
                FROM public."Client" 
                JOIN public."User" ON public."Client".user = public."User".id 
                JOIN public."Adress" ON public."Adress".id = public."User".adress
                    WHERE public."User".username = ($1)`;
        user = await database.query(queryUser, [username]);
        console.table(user.rows);
        if(user.rows[0] != null) {

            CARD = `
<strong>Вы зарегистрированы\uD83D\uDE4C 
Ваши данные, <b>${user.rows[0].first_name}</b>: </strong>
                                    
<strong>\uD83D\uDD11 Персональный ключ: </strong> <i>${user.rows[0].personal_key}</i>
<strong>\uD83D\uDD74 Имя: </strong><i>${user.rows[0].first_name}</i>
<strong>\uD83D\uDD74 Фамилия: </strong><i>${user.rows[0].last_name}</i>
<strong>🕶 Никнейм: </strong><i>${user.rows[0].username}</i>
<strong>\uD83D\uDCF1 Телефон: </strong><i>${user.rows[0].phone}</i>
<strong>\uD83D\uDDFA Адрес: </strong><i>${user.rows[0].street}</i>
<strong>🏆 Бонусы: </strong><i>${user.rows[0].bonus}</i>
<strong>🤝 Приглашенные друзьяс: </strong><i>${user.rows[0].count_friend}</i>
<strong>📅 Дата регистрации: </strong><i>${user.rows[0].start_date}</i>`;

            bot.sendDocument(id, "img/card.gif", {
                parse_mode: "HTML",
                caption: CARD,
                reply_markup: {
                    inline_keyboard: 
                        [
                            [{text: `📱 Изменить телефон`, callback_data: `Изменить телефон?`}],
                            [{text: `🗺 Изменить адрес`, callback_data: `Изменить адрес?`}], 
                            [{text: `🤝 Пригласить друзей`, callback_data: `Пригласить друзей?`}],
                            [{text: `🏆 Получить бонусы`, callback_data: `Получить бонусы?`}]
                        ]
                }
            })

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

module.exports.personalCardUser = personalCardUser;