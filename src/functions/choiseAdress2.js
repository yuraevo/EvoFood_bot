const DB = require("../connect_db")
const Client  = require('pg');
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")

module.exports = (id, data, username, bot, query) => {
    switch(data) {
        case "Ukraine":
            database = new Client.Pool(DB);
            let openConnectDB = new Promise(function (res, rej) {
                console.log("Зашло в промис украины")
                res("Зало в рес")
            })
            openConnectDB
            .then(async function keys() {
                return await new Promise(function (res, rej) {
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
                            //res("Зашло в рес")
                })
            })
            .then(database.end())
            .catch(err => console.log(err));
                break;
    
                case "Odessa":
                        var adress;
                        var phone;
                        var array = new Array();
                        var uniqueItems;
                        database = new Client.Pool(DB);
                        var promisok = new Promise(function(res, rej) {
                            res("Зашло в рес")
                        })
                        promisok
                        .then(async function setAdress() {
                            return await new Promise(function () {
                                var prom = new Promise(function () {
                                    bot.sendMessage(id, "Введите адрес: ", {});
                                   // bot.answerCallbackQuery(query.id, "Ви ввели адрес");
                                    bot.on("message", msg => {
                                        text = msg.text;
                                        adress = text;
                                        array.push(adress);
                                        console.log("Адрес в промисе: " + adress)
                                        uniqueItems = Array.from(new Set(array))
                                        console.log(uniqueItems);
                                    })
                                   // res("Зашло в рес")
                                })
                                prom.then(console.log("Да-да, пошел я нахуй")).catch(err => console.log(err));
    
                               // res()
                            })
                        })
                        .then(async function setAdress() {
                            return await new Promise(function () {
                                bot.sendMessage(id, "Введите телефон: ", {});
                               //bot.answerCallbackQuery(query.id, "Ви ввели телефон");
                                bot.on("message", msg => {
                                    text = msg.text;
                                    phone = text;
                                    // phone = msg.text;
                                    array.push(phone);
                                    console.log("Телефон в промисе: " + phone);
                                    uniqueItems = Array.from(new Set(array));
                                    console.log(uniqueItems);
                                })
                               // res("Зашло в рес")
                            })
                        })
                        .then(console.log(uniqueItems))
                        .then(database.end())
                        .catch(err => console.log(err));
    
                break;
    
           
            }
}