const bot = require("./bot") 
const Text = require("./text")
const keyboard = require("./keyboard")

module.exports = () => {
    bot.onText(/\/start/, msg => {
        const { id } = msg.chat,
        message = new Text(msg);
        bot.sendDocument(id, 'img/helloMessage.gif', {
            caption: message.messageHello(),
            parse_mode: "HTML",
            reply_markup: { keyboard : keyboard.main }
        })
    })
}