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
                    database = new Client.Pool(DB)
                    var choiceUkraine = 'SELECT name_country FROM public."Country" WHERE name_country = ($1)'
                    const insert = await database.query(choiceUkraine, ['Ukraine'])
                    bot.answerCallbackQuery(query.id, "Вы выбрали " + "Ukraine")
                    // bot.sendMessage(id, "Вы выбрали Одессу\uD83C\uDDFA\uD83C\uDDE6\u2693" + "!", {
                    //     parse_mode: "Markdown",
                    //     reply_markup: {
                    //         keyboard: keyboards.personal_accaunt
                    //         }
                    //     }); 
                break
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