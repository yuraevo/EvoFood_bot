const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");

async function show_basket(bot, id, first_name, username)
{
    try {
        database = new Client.Pool(DB);
        var BASKET_USER_QUERY = `SELECT 
                            "Dish".name_dish, 
                            "Order_Dish".quantity, 
                            "Order_Dish".cost, 
                            "Order_Dish".date, 
                            "User".username, 
                            "User".first_name 
                        FROM "Order_Dish" JOIN "Dish" ON "Dish".id = "Order_Dish".dish
                            JOIN "Client" ON "Client".id = "Order_Dish".client
                            JOIN "User" ON "User".id = "Client".user
                        WHERE "User".username = ($1)`;  //поиск в базе

        var BASKET_USER_ALL_PRICE_QUERY = `SELECT SUM("Order_Dish".cost) AS all_cost 
        FROM "Order_Dish" JOIN "Dish" ON "Dish".id = "Order_Dish".dish
        JOIN "Client" ON "Client".id = "Order_Dish".client
        JOIN "User" ON "User".id = "Client".user
        WHERE "User".username = ($1)`;  //поиск в базе

        BASKET_USER = await database.query(BASKET_USER_QUERY, [username]); //запрос корзины юзера в базе
        BASKET_USER_ALL_PRICE = await database.query(BASKET_USER_ALL_PRICE_QUERY, [username]); //запрос корзины юзера в базе

        if(BASKET_USER.rows[0] != null) {
            var BASKET_DISH_TEXT = []; 
            var TEXT = `
📃 Вот ваши заказы, ${BASKET_USER.rows[0].first_name}: \n`
            for (const element of BASKET_USER.rows) {
                BASKET_DISH_TEXT.push( `<b>• </b>` + `<b>${element.name_dish}</b>` +  ` (<i>x${element.quantity}</i>) ` +  `= ` + `<b>${element.cost}₴</b>` + `\n`);
            }
            console.log(BASKET_DISH_TEXT)
            await bot.sendDocument(id, "img/basket3.gif", {
                parse_mode: "HTML",
                caption: TEXT + '\n' + BASKET_DISH_TEXT.join('') + `\n` + `Цена: <b>${BASKET_USER_ALL_PRICE.rows[0].all_cost}₴</b>`,
                reply_markup: {
                    inline_keyboard: 
                        [
                            [{text: "\uD83D\uDEF5 Доставка на дом(по адресу)", callback_data: `Доставка домой` }],
                            [{text: "\uD83C\uDFDB Забрать из заведения", callback_data: `Забрать из заведения`}],
                            [{text: "\uD83D\uDCF2 Забронировать заказ и столик", callback_data: `Забрать из заведения`}],
                            [{text: "🧹 Очистить корзину", callback_data: `Очистить корзину`}]
                        ]
                }
            })
        }
        else {
            TEXT = `<strong>${first_name}, Ваш список заказов пуст </strong> 
            
У нас большой выбор вкусных блюд🍝 
Переходите в меню👇`
            await bot.sendDocument(id, "img/travolta4.gif", {
                parse_mode: "HTML",
                caption: TEXT,
            })
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
    }
}

module.exports.show_basket = show_basket;