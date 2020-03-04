const DB = require("../connect_db")
const Client  = require('pg');
const bot = require("../bot") 
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")


async function choiceAdress(id, data, username) {
    try {
        switch(query.data) {
            case "Ukraine_Odessa":
                bot.sendMessage(query.message.chat.id, "Вы выбрали Украину!", {})
                //console.log(username + "Выбрал Украина-Одесса")
            break
        }
    }
    catch(ex) {

    }
    finally {

    }
}