const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const personal_card_user = require("./personal_card_user")

async function switch_text(id, data, first_name, last_name, username, bot, query)
{
    try {
        //bot.deleteMessage(id, query.message.message_id);
        switch(data) {
            case 'Очистить корзину':
                console.log("Зашло в очистить корзину")
                TEXT = `
<strong>${first_name}, Вы действительно хотите удалить все содержимое корзины? </strong>`
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

            case `Да, очистить корзину`:
                var DELETE_BASKET_USER_QUERY = `DELETE FROM "Order_Dish"
                WHERE "Order_Dish".client = (SELECT "Client".id FROM "Client" 
                                            JOIN "User" ON "User".id = "Client".user
                                            WHERE "User".username = ($1))`;  // удаление всех заказов из корзины
                DELETE_BASKET_USER = await database.query(DELETE_BASKET_USER_QUERY, [username]); //запрос корзины юзера в базе 
                TEXT = `<strong>${first_name}, мы почистили Ваш список заказов, теперь там пусто </strong> 
            
У нас большой выбор вкусных блюд 🍝 
Переходите в меню👇`
                await bot.sendDocument(id, "img/basket2.gif", {
                        parse_mode: "HTML",
                        caption: TEXT,
                })
                
            break;

            case 'Изменить телефон?':
                console.log("Пользователь хочет изменить телефон")
                TEXT = `
<strong>${first_name}, Вы действительно хотите изменить телефон? </strong>`
                await bot.sendMessage(id, TEXT, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: 
                            [
                                [{text: "📲 Да", callback_data: `Да, изменить телефон` }],
                                [{text: "🔙 Нет, назад", callback_data: `Назад в персональный кабинет`}]
                            ]
                    }
                });
            break;

            case 'Да, изменить телефон': 
                await bot.deleteMessage(id, query.message.message_id);
                let array = new Array(); // массив значений
                let uniqueItems = new Array(); //массив уникальных значений
                async function inputNewPhone(array, uniqueItems, username) {
                    try {
                       return await new Promise(async function(resolve) {
                           bot.sendMessage(id, "Введите Ваш новый номер телефона:", {});
                           bot.on("message", msg => {
                                    if(uniqueItems.length < 1) {
                                        adress = msg.text;
                                        array.push(adress);
                                        uniqueItems = Array.from(new Set(array));
                                        console.log("Вводит новый номер: " + uniqueItems);
                                        insert_new_phone_into_user(array, uniqueItems, username);
                                    }
                            });
                            resolve();
                        });
                    }
                    catch(ex) {
                        console.log('Что-то произошло - ' + ex);
                    }
                    finally { 
                       
                    }
                }

                async function insert_new_phone_into_user(array, uniqueItems, username) {
                    try {
                        database = new Client.Pool(DB);
                        await database.connect().then(console.log("Соединение установлено"));;
                        var INSERT_NEW_PHONE_QUERY = `UPDATE "User"
                        SET phone = ($1)
                        WHERE username = ($2)`; // Функция вставки в самой базе в user
                        console.log("Вывод нового номера: " + uniqueItems[0])
                        await database.query(INSERT_NEW_PHONE_QUERY, [uniqueItems[0], username]); //Исполнение функции
                        await bot.sendMessage(id, `Ваш новый номер <i>${uniqueItems[0]}</i> уже в системе!`, {
                            parse_mode: "HTML",
                            // reply_markup: {
                            //     inline_keyboard: 
                            //         [
                            //             [{text: "Зайти в корзину", callback_data: `Корзина` }],
                            //             [{text: "🔙 Назад ", callback_data: `Корзина`}]
                            //         ]
                            // }
                        })
                    }
                    catch(ex) {
                        console.log('Что-то произошло- ' + ex);
                    }
                    finally {
                        await database.end()
                    }
                }
                await inputNewPhone(array, uniqueItems, username);
            break;
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }

    finally {

    }
}

module.exports.switch_text = switch_text;