const TelegramBot = require('node-telegram-bot-api');
const token = require("./token")
const TOKEN = token.TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: {
        timeout:1000,
        interval: 1000,
        //autoStart: true,
        // params: {
            // timeout: 10000
        // }
    } 
    // webHook: {
    //     port: 3000,
    //     autoOpen: false
    // }
})
console.log("Bot has been started...")

module.exports = bot

