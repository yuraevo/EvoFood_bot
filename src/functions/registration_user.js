var dateTime = require('node-datetime');
const DB = require("../connect_db");
const Client  = require('pg');
const registrationooo = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const choise_country = require("./findUser");
const TWO = 2;
const currentDate = new Date();
var parse = require('postgres-date')
const now = new Date()
var dt = dateTime.create();
dt.format('m/d/y H:M');

async function registration(id, data, first_name, last_name, username, bot, query) {
    try {
        database = new Client.Pool(DB);
        // await bot.sendChatAction(id, "typing");
        // await bot.deleteMessage(id, query.message.message_id);
        var QUERY_ALL_COUNTRY = `SELECT id, name_country FROM public."Country"`; // все страны
        var QUERY_ALL_CITY = `SELECT id, name_city, flag FROM public."City"`; // все города
        ALL_COUNTRY = await database.query(QUERY_ALL_COUNTRY); // запрос на все страны
        ALL_CITY = await database.query(QUERY_ALL_CITY); // Запрос на все города
        for (const iterator of ALL_COUNTRY.rows) {
            switch(data) {
                case `Выб. страна: ` + iterator.name_country:
                    await bot.sendChatAction(id, "typing");
                    await bot.deleteMessage(id, query.message.message_id);
                    await bot.answerCallbackQuery(query.id, "Вы выбрали страну " + iterator.name_country);
                    console.log("Выбранная страна: " + iterator.name_country);

                    var query_country = `SELECT id, name_country 
                            FROM public."Country" WHERE id = ($1)`; // запрос на выбранную страну
                    var query_cities = `SELECT name_city, flag FROM public."City" WHERE country = ($1)`; // запрос на города в этой стране
                    var country = await database.query(query_country, [iterator.id]); // поиск страны
                    console.log("Вывод айди выбранной страны: " + country.rows[0].name_country) //вывод названия страны
                    var cities = await database.query(query_cities, [country.rows[0].id]); //поиск городов

                    var TEXT = `<strong>${query.message.chat.first_name}, выберите пожалуйста город, в котором живете ⤵</strong>`;
                    var opts = { inline_keyboard: [] };
                    await cities.rows.forEach(element => {
                        opts.inline_keyboard.push(
                            [
                                {text: element.flag + " " + element.name_city, callback_data: `Выб. гор: ${element.name_city}`}
                            ]
                        );
                    }); 
                        opts.inline_keyboard.push(
                            [
                                {text: `🔙Вернуться назад`, callback_data: `Выб. гор: Назад` }
                            ]
                        );
                    await bot.sendMessage(id, TEXT, {
                        parse_mode: "HTML",
                        reply_markup: opts
                    });

                    await database.end();
                break; 
            }
        }

        for (const iterator of ALL_CITY.rows) {
            switch(data) {
                case `Выб. гор: ` + iterator.name_city:
                    await database.end();
                    await bot.sendChatAction(id, "typing");
                    await bot.deleteMessage(id, query.message.message_id);
                    await bot.answerCallbackQuery(query.id, "Вы выбрали город " + iterator.name_city);

                    let array = new Array();
                    let uniqueItems = new Array();

                    async function inputAdress(array, uniqueItems) {
                        try {
                            return await new Promise(async function(resolve) {
                                if(uniqueItems.length < TWO) {
                                    //console.log(uniqueItems.length)
                                    database = new Client.Pool(DB);
                                    bot.sendMessage(id, "Введите адрес: ", {});
                                    bot.on("message", msg => {
                                        adress = msg.text;
                                        array.push(adress);
                                        console.log("Адрес в промисе inputAdress: " + adress);
                                        uniqueItems = Array.from(new Set(array));
                                        console.log(uniqueItems);
                                        resolve();
                                    });
                                    console.log("Сюда захлдтт")
                                }
                                else {
                                    bot.sendMessage(id, "Вы уже ввели ", {});
                                }
                            });
                        }
                        catch(ex) {
                            console.log('Что-то произошло в адресе - ' + ex);
                        }
                        finally { 
                            console.log(uniqueItems.length)
                            await database.end()
                            console.log("DB disconnect adress");
                        }
                    }

                    async function inputPhone(array, uniqueItems) {
                        try {
                            return await new Promise(async function(resolve){
                                if(uniqueItems.length < TWO) {
                                    //console.log(uniqueItems.length)
                                    database = new Client.Pool(DB);
                                    bot.sendMessage(id, "Введите телефон: ", {});
                                    bot.on("message", msg => {
                                        phone = msg.text;
                                        array.push(phone);
                                        console.log("Телефон в промисе inputPhone: " + phone);
                                        uniqueItems = Array.from(new Set(array));
                                        console.log(uniqueItems);
                                        resolve();       
                                    });
                                }
                                else {
                                    bot.sendMessage(id, "Вы уже ввели ", {});
                                }
                            })
                        }
                        catch(ex) {
                            console.log('Что-то произошло в телефоне - ' + ex);
                        }
                        finally {
                            console.log(uniqueItems.length)
                            await database.end();
                            console.log("DB disconnect phone");
                        }
                    }

                    async function userRegistration(query, uniqueItems) {
                        try {
                            return await new Promise(async function(resolve){
                                uniqueItems = Array.from(new Set(array)); // Уникальные значения
                                console.log(uniqueItems);
                                console.log("Регистрация Юзера")
                                database = new Client.Pool(DB);
                                await database.connect().then(console.log("Соединение установлено"));;
                                var SELECT_ID_CITY = 'SELECT id FROM public."City" WHERE name_city = ($1)'; // Выбираем введенный город
                                var ID_CITY = await database.query(SELECT_ID_CITY, [iterator.name_city]); //Запрос выбора города
                                
                                console.table("Айди города: " + ID_CITY.rows[0].id);
                                const INSERT_CITY_IN_ADRESS = 'INSERT INTO public."Adress" (city, street) VALUES ($1, $2)'; // Вставить в Адресс
                                console.log("Вывод уник айтемс " + uniqueItems[0])
                                await database.query(INSERT_CITY_IN_ADRESS, [ID_CITY.rows[0].id, uniqueItems[0]]); //Добавление улицы в Adress
                                console.log(uniqueItems[0]);

                                var ID_ADRESS_SELECT = 'SELECT id FROM public."Adress" WHERE street = ($1)'; // взятие айди введенного адреса 
                                const streetUser = await database.query(ID_ADRESS_SELECT, [uniqueItems[0]]); 

                                var INSERT_USER = 'INSERT INTO public."User"(first_name, last_name, username, personal_key, adress, phone) VALUES ($1, $2, $3, $4, $5, $6)'; //полное добавдение в Юзера
                                await database.query(INSERT_USER, [query.message.chat.first_name, query.message.chat.last_name, query.message.chat.username, query.message.chat.id, streetUser.rows[0].id, uniqueItems[1]]); 

                                var SELECT_CURRENT_USER = 'SELECT id FROM public."User" WHERE username = ($1)';
                                var CURRENT_USER = await database.query(SELECT_CURRENT_USER, [query.message.chat.username]); // текущий Юзер
                                console.log("Текущий юрез: " + CURRENT_USER.rows[0].id)

                                var INSERT_USER_INTO_CLIENT = 'INSERT INTO public."Client" ("user", bonus, count_friend, start_date) VALUES ($1, $2, $3, $4)';
                                await database.query(INSERT_USER_INTO_CLIENT, [CURRENT_USER.rows[0].id, 0, 0, now]);
                                resolve()
                            }).catch(ex => {
                                console.log('Something wrong happend - ' + ex);
                            })
                        }
                        catch(ex) {
                            console.log('Something wrong happend - ' + ex);
                        }
                        finally {
                            await database.end()
                            console.log("out on userRegistrration");
                        }
                    }

                    await inputAdress(array,uniqueItems);
                    await inputPhone(array, uniqueItems);
                    await userRegistration(query, uniqueItems);
                        
                break;
            }
        }

        switch(data) {
            case "Выб. гор: Назад":
                await database.end();
                await bot.sendChatAction(id, "typing");
                await bot.answerCallbackQuery(query.id, "Вы вернулись назад");
                await choise_country.findUser(id, first_name, last_name, username, bot);
            break;
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex);
    }
    finally {
        //await database.end()
        console.log("DB disconnect all");
    }
}

module.exports.registration = registration;