const DB = require("../connect_db");
const Client  = require('pg');
const registrationooo = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const TWO = 2;


async function registration(id, data, username, bot, query) {
    try {
        console.log("Зашло в choiseAdress");
        console.log(data);
        
        switch(data) {
            case "Ukraine":
                //database = new Client.Pool(DB);
                //insert = await database.query(choiceCity, ['Ukraine']);
                bot.answerCallbackQuery(query.id, "Ви обрали Україну");
                bot.sendMessage(id, text.choiceCity, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard:
                            [
                                [{ text: "Одеса\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Odessa" }],
                                [{ text: "Київ\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Kyiv" }],
                                [{ text: "Миколаїв\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Mykolaiv" }],
                                [{ text: "Херсон\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Cherson" }],
                                [{ text: "Львів\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Lviv" }],
                            ]
                        }
                    });
                break;

                case "Odessa":
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
                                uniqueItems = Array.from(new Set(array));
                                console.log(uniqueItems);
                                console.log("Регистрация Юзера")
                                database = new Client.Pool(DB);
                                await database.connect().then(console.log("Соединение установлено"));;
                                var ID_Odessa_SELECT = 'SELECT id FROM public."City" WHERE name_city = ($1)'; // Выбираем Одессу
                                var ID_Odessa = await database.query(ID_Odessa_SELECT, ["Odessa"]); 
                                
                                console.table("Айди Одессы: " + ID_Odessa.rows[0].id);
                                const INSERT_CITY_IN_ADRESS = 'INSERT INTO public."Adress" (city, street) VALUES ($1, $2)';
                                console.log("Вывод уник айтемс " + uniqueItems[0])
                                await database.query(INSERT_CITY_IN_ADRESS, [ID_Odessa.rows[0].id, uniqueItems[0]]); //Добавление улицы в Adress
                                console.log(uniqueItems[0]);

                                var ID_ADRESS_SELECT = 'SELECT id FROM public."Adress" WHERE street = ($1)';// взятие айди адреса
                                const streetUser = await database.query(ID_ADRESS_SELECT, [uniqueItems[0]]); 

                                var INSERT_USER = 'INSERT INTO public."User"(first_name, last_name, username, personal_key, adress, phone) VALUES ($1, $2, $3, $4, $5, $6)';
                                await database.query(INSERT_USER, [query.message.chat.first_name, query.message.chat.last_name, query.message.chat.username, query.message.chat.id, streetUser.rows[0].id, uniqueItems[1]]); 
                                resolve()
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
    catch(ex) {
        console.log('Something wrong happend - ' + ex);
    }
    finally {
        // await database.end()
        // console.log("DB disconnect all");
    }
}

module.exports.registration = registration;