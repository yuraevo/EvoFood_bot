const TelegramBot = require('node-telegram-bot-api');
const token = require("./token")
const TOKEN = token.TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})
console.log("Bot has been started...")

module.exports = bot
