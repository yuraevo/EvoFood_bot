const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function switch_text(id, data, first_name, last_name, username, bot, query)
{
    try {
        //bot.deleteMessage(id, query.message.message_id);
        switch(data) {
            case 'Очистить корзину':
                console.log("Зашло в очистить корзину")
                TEXT = `
<strong> ${first_name}, Вы действительно хотите удалить все содержимое корзины? 
                `
                bot.sendMessage(id, TEXT, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: 
                            [
                                [{text: "😭 Да", callback_data: `Да, очистить корзину` }],
                                [{text: "🔙 Нет, назад", callback_data: `Корзина`}]
                            ]
                    }
                });
            break;

            case 'Да, очистить корзину':
                var DELETE_BASKET_USER_QUERY = `DELETE 
                FROM "Order_Dish" JOIN "Dish" ON "Dish".id = "Order_Dish".dish
                    JOIN "Client" ON "Client".id = "Order_Dish".client
                    JOIN "User" ON "User".id = "Client".user
                WHERE "User".username = ($1)`;  // удаление
        DELETE_BASKET_USER = await database.query(DELETE_BASKET_USER_QUERY, [username]); //запрос корзины юзера в базе 
            break;
        }
    }
    catch(ex) {

    }

    finally {

    }
}

module.exports.switch_text = switch_text