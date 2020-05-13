const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function inline_keyboard_add_to_card(id, data, username, bot, query) {
    try {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT name_dish FROM public."Dish"';
        dish = await database.query(queryUser);
        if(dish.rows[0] != null) { 
            dish.rows.forEach(element => {
                switch(data) {
                    case `К: ` + element.name_dish:
                        bot.answerCallbackQuery(query.id, "Ваш заказ " + element.name_dish + " в корзине");
                        
                        // bot.deleteMessage(id, query.message.message_id);
                        // bot.sendDocument(id, "img/add_to_card.gif", {
                        //     caption: "Добавить в корзину " + dish.rows[0].name_dish + "?",
                        //     parse_mode: "HTML",
                        //     reply_markup: {
                        //         inline_keyboard: 
                        //             [
                        //                 [{text: `Да ${dish.rows[0].name_dish}`, callback_data: `К: ${dish.rows[0].name_dish}` }],
                        //                 [{text: "Нет", callback_data: "Вернуться в меню"}]
                        //             ]
                        //     }
                        // });
                    break;
                }
            });
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex);
    }
    finally {
        //await database.end()
        console.log("DB disconnect");
    }
}

module.exports.inline_keyboard_add_to_card = inline_keyboard_add_to_card;
