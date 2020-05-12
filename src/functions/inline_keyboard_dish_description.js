const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function addToCard(id, data, username, bot, query) {
    try {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT name_dish, description, cost FROM public."Dish" WHERE name_dish = ($1)';
        dish = await database.query(queryUser, [data]);
        if(dish.rows[0] != null) {
            console.log("Пользователь выбрал: " + dish.rows[0].name_dish)
            switch(data) {
                case dish.rows[0].name_dish:
                    bot.answerCallbackQuery(query.id, "Вы выбрали " + dish.rows[0].name_dish);
                    bot.deleteMessage(id, query.message.message_id);
                    bot.sendDocument(id, "img/add_to_card.gif", {
                        caption: "Добавить в корзину " + dish.rows[0].name_dish + "?",
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: 
                                [
                                    [{text: "Да", callback_data: "Добавить в корзину"}],
                                    [{text: "Нет", callback_data: "Вернуться в меню"}]
                                ]
                        }
                    });
                break;
            }
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex);
    }
    finally {
    await database.end()
    console.log("DB disconnect");
    }
}

module.exports.addToCard = addToCard;
