const DB = require("../connect_db")
const Client  = require('pg');
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")


async function choiceAdress(id, data, username, bot, query) {
    try {
        console.log("Зашло в choiseAdress")
        console.log(data)
            switch(data) {
                case "Ukraine":
                    database = new Client.Pool(DB);
                     
                    insert = await database.query(choiceUkraine, ['Ukraine']);
                    bot.answerCallbackQuery(query.id, "Ви обрали Україну");
                    bot.sendMessage(id, text.choiseCity, {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard:
                            [
                                [
                                    { text: "Одеса\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Odessa" },
                                    // { text: "Миколаїв\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Миколаїв" },
                                    // { text: "Київ\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Київ" },
                                    // { text: "Херсон\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Херсон" },
                                    // { text: "Львів\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Львів" }
                                ]
                            ]
                        }
                    });
                break;
                case "Odessa":
                    database = new Client.Pool(DB);

                break;
            }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
        console.log("DB disconnect choiseAdress")
    }
}

module.exports.choiceAdress = choiceAdress;