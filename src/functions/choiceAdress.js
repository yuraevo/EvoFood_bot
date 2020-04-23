const DB = require("../connect_db")
const Client  = require('pg');
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")

async function choiceAdress(id, data, username, bot, query) {
    try {
        console.log("Зашло в choiseAdress");
        console.log(data);

        switch(data) {
            case "Ukraine":
                database = new Client.Pool(DB);
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
                    let uniqueItems;

                    async function adr(array, uniqueItems) {
                        try {
                            return await new Promise(function(resolve) {
                                database = new Client.Pool(DB);
                                bot.sendMessage(id, "Введите адрес: ", {});
                                bot.on("message", msg => {
                                    adress = msg.text;
                                    array.push(adress);
                                    console.log("Адрес в промисе: " + adress);
                                    uniqueItems = Array.from(new Set(array));
                                    console.log(uniqueItems);
                                    console.log("Вышло оттуда отуда нужно");
                                    resolve();
                                });
                            });
                        }
                        catch(ex) {
                            console.log('Что-то произошло в адресе - ' + ex);
                        }
                        finally { 
                            await database.end()
                            console.log("DB disconnect adress");
                        }
                    }

                    async function ph(array, uniqueItems) {
                        try {
                            return await new Promise(function(resolve){
                                database = new Client.Pool(DB);
                                bot.sendMessage(id, "Введите телефон: ", {});
                                bot.on("message", msg => {
                                    phone = msg.text;
                                    array.push(phone);
                                    console.log("Телефон в промисе: " + phone);
                                    uniqueItems = Array.from(new Set(array));
                                    console.log(uniqueItems);
                                    console.log("Ну конец же должен быть");
                                    resolve();
                                })
                            })
                        }
                        catch(ex) {
                            console.log('Что-то произошло в телефоне - ' + ex);
                        }
                        finally {
                            await database.end();
                            console.log("DB disconnect phone");
                        }
                    }

                    await adr(array,uniqueItems);
                    await ph(array, uniqueItems);
                    //console.log(uniqueItems)

                    // var idOdessa = 'SELECT id FROM public."City" WHERE name_city = ($1)';
                    // Odessa = await database.query(idOdessa, ["Odessa"]);
                    // console.table(Odessa.rows[0].id);
                    // var insertFirstNameNewUser = 'INSERT INTO public."Adress" (city, street) VALUES ($1, $2)';
                    //insertStreet = await database.query(insertFirstNameNewUser, [Odessa.rows[0].id, 'ooo']);
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

module.exports.choiceAdress = choiceAdress;