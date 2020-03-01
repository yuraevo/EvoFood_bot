const bot = require("./bot") 
const bot_command = require("./bot_commands")
const keyboard = require("./keyboard")
const keyboard_text = require("./keyboard_text")
const func = require("./functions")

bot_command()

bot.on("message", msg => {
    const { id } = msg.chat
    const { first_name } = msg.chat
    const { username } = msg.chat
    console.log("зашло")
    switch(msg.text) {
        case keyboard_text.main.personal_accaunt:
            console.log("Пользователь заходит в аккаунт")
            func.findUser(id, username)
        break    
    }
})