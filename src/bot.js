const TelegramBot = require('node-telegram-bot-api');
const token = require("./token")
const TOKEN = token.TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: {
        timeout: 3000,
        interval: 3000,
        autoStart: true,
        params: {
            timeout: 10000
        }
   } 
    // webHook: {
    //     port: 3000,
    //     autoOpen: false,
    //     // timeout: 1000,
    //     // interval: 1000
    // }
})
console.log("Bot has been started...")

module.exports = bot

