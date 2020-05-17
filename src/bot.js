const TelegramBot = require('node-telegram-bot-api');
const token = require("./token")
const TOKEN = token.TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: {
        timeout: 2000,
        interval: 2500,
        autoStart: true
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

