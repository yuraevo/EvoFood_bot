const bot = require("./bot") 
const bot_command = require("./bot_commands")
const keyboard = require("./keyboard")
const keyboard_text = require("./keyboard_text")
const func = require("./functions/findUser")

bot_command()

bot.on("message", msg => {
    const { id } = msg.chat
    const { username } = msg.chat
    const { first_name } = msg.chat
    const { last_name } = msg.chat

    console.log("зашло")
    switch(msg.text) {
        case keyboard_text.main.personal_accaunt:
            console.log("Пользователь " + username + " заходит в личный аккаунт")
            func.findUser(id, first_name, last_name, username)
        break    
    }
})