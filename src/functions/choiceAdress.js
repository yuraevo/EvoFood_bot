const DB = require("../connect_db")
const Client  = require('pg');
//const bot = require("../bot") 
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")


async function choiceAdress(id, data, username, bot) {
    try {
        console.log("Зашло в choiseAdress")
        console.log(data)
            switch(data) {
                case "Odessa":
                    // if(err){
                    //     return console.error('Соединение не удалось')
                    // }
                    database = new Client.Pool(DB)
                    var choiceOdessa = 'INSERT INTO public."City"(country, name_city) VALUES ($1, $2)'
                    const insert = await database.query(choiceOdessa, [1, 'street'])
                    bot.sendMessage(id, "Вы выбрали Одессу\uD83C\uDDFA\uD83C\uDDE6\u2693" + "!", {
                        parse_mode: "Markdown",
                        reply_markup: {
                            keyboard: keyboards.personal_accaunt
                            }
                        }); 
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