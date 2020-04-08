const bot = require("./bot") 
const TextHello = require("./textHello")
const keyboard = require("./keyboard")

module.exports = () => {
    bot.onText(/\/start/, msg => {
        const { id } = msg.chat
        messageHello = new TextHello(msg);
        bot.sendDocument(id, 'img/helloMessage.gif', {
            caption: messageHello.messageHello(),
            parse_mode: "HTML",
            reply_markup: { keyboard : keyboard.main }
        })
    })
}