const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const personal_card_user = require("./personal_card_user");
const basket = require("./basket");

async function switch_text(id, data, first_name, last_name, username, bot, query)
{
    try {
        switch(data) {
            case 'Очистить корзину?':
                await bot.deleteMessage(id, query.message.message_id);
                console.log("Зашло в очистить корзину")
                TEXT = `
<strong>${first_name}, Вы действительно хотите удалить все содержимое корзины? </strong>`
                bot.sendMessage(id, TEXT, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: 
                            [
                                [{text: "😭 Да", callback_data: `Да, очистить корзину` }],
                                [{text: "🔙 Нет, назад", callback_data: `Назад в корзину`}]
                            ]
                    }
                });
            break;

            case `Назад в корзину`:
                await bot.deleteMessage(id, query.message.message_id);
                basket.show_basket(bot, id, first_name, username);
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
                await bot.deleteMessage(id, query.message.message_id);
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

            case `Назад в персональный кабинет`:
                await bot.deleteMessage(id, query.message.message_id);
                personal_card_user.personalCardUser(id, first_name,last_name,username,bot)
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
                            parse_mode: "HTML"
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


            case 'Изменить адрес?':
                await bot.deleteMessage(id, query.message.message_id);
                console.log("Пользователь хочет изменить адрес")
                TEXT = `
<strong>${first_name}, Вы действительно хотите изменить адрес? </strong>`
                await bot.sendMessage(id, TEXT, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: 
                            [
                                [{text: "📲 Да", callback_data: `Да, изменить адрес` }],
                                [{text: "🔙 Нет, назад", callback_data: `Назад в персональный кабинет`}]
                            ]
                    }
                });
            break;
             

            case 'Да, изменить адрес': 
            await bot.deleteMessage(id, query.message.message_id);
                //await bot.deleteMessage(id, query.message.message_id);
                let array2 = new Array(); // массив значений
                let uniqueItems2 = new Array(); //массив уникальных значений
                async function inputNewAdress(array2, uniqueItems2, username) {
                    try {
                       return await new Promise(async function(resolve) {
                           bot.sendMessage(id, "Введите Ваш новый адрес:", {});
                           bot.on("message", msg => {
                                    if(uniqueItems2.length < 1) {
                                        adress = msg.text;
                                        array2.push(adress);
                                        uniqueItems2 = Array.from(new Set(array2));
                                        console.log("Вводит новый адрес: " + uniqueItems2);
                                        insert_new_adress_into_user(array2, uniqueItems2, username);
                                    }
                            });
                            resolve();
                        })
                    }
                    catch(ex) {
                        console.log('Что-то произошло - ' + ex);
                    }
                    finally { 
                        await database.end();
                    }
                }

                async function insert_new_adress_into_user(array, uniqueItems, username) {
                    try {
                        database = new Client.Pool(DB);
                        await database.connect().then(console.log("Соединение установлено"));;

                        var SELECT_USER_CITY_ID_QUERY = `
                        SELECT "City".id 
                        FROM "Client" 
                            JOIN "User" ON "User".id = "Client".user
                            JOIN "Adress" ON "Adress".id = "User".adress
                            JOIN "City" ON "City".id = "Adress".city
                            JOIN "Country" ON "Country".id = "City".country
                        WHERE "User".username = ($1)
                        `;

                        var INSERT_INTO_ADRESS_QUERY = `
                        INSERT INTO "Adress"(city, street) VALUES(($1), ($2))
                        `;

                        var INSERT_NEW_ADRESS_QUERY = `
                        UPDATE "User" SET adress = ($1) WHERE username = ($2)`; 

                        var SELECT_ADRESS_ID_QUERY = 
                        `
                        SELECT id, street FROM "Adress" WHERE street = ($1)
                        `;
                        console.log("Вывод нового адреса: " + uniqueItems[0]);

                        USER_CITY_ID = await database.query(SELECT_USER_CITY_ID_QUERY, [username]); // взятие нынешнего айди города клиента
                        await database.query(INSERT_INTO_ADRESS_QUERY, [USER_CITY_ID.rows[0].id, uniqueItems[0]]); // вставка этого города в адрес и вставка улицы в адрес
                        SELECT_ADRESS = await database.query(SELECT_ADRESS_ID_QUERY, [uniqueItems[0]]);

                        await database.query(INSERT_NEW_ADRESS_QUERY, [SELECT_ADRESS.rows[0].id, username]); 

                        await bot.sendMessage(id, `Ваш новый адрес <i>${SELECT_ADRESS.rows[0].street}</i> уже в системе!`, {
                            parse_mode: "HTML"
                        });
                        //await database.end();
                    }
                    catch(ex) {
                        console.log('Что-то произошло- ' + ex);
                    }
                    finally {
                        await database.end()
                    }
                }
                await inputNewAdress(array2, uniqueItems2, username);
            break;

            case `Пригласить друзей?`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `Получить бонусы?`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `Доставка домой?`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `Забрать из заведения?`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `Забронировать заказ и столик?`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `1`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

            case `Поддержка`:
                bot.answerCallbackQuery(query.id, `${first_name}, данная функция скоро станет доступна!`);
            break;

        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }

    finally {
        // await database.end()
    }
}

module.exports.switch_text = switch_text;