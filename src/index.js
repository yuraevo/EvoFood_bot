const bot = require("./bot") 
const bot_command = require("./bot_commands")
const keyboards = require("./keyboard")
const keyboard_text = require("./keyboard_text")
const func = require("./functions/findUser")
const adress = require("./functions/registration_user")
const personal_card_user = require("./functions/personal_card_user")
const choise_dish = require("./functions/choiseDish")

bot_command(); 

bot.on("message", msg => {

    const { id } = msg.chat;
    const { username } = msg.chat;
    const { first_name } = msg.chat;
    const { last_name } = msg.chat;

    switch(msg.text) {

        case keyboard_text.main.personal_accaunt: 
            console.log("Пользователь " + username + " нажал кнопку ЛИЧНЫЙ КАБИНЕТ");
            func.findUser(id, first_name, last_name, username, bot, msg);
        break;

        // case keyboard_text.main.card: 
        //     console.log("Пользователь " + username + " нажал кнопку ЛИЧНЫЙ КАБИНЕТ");
        //     func.findUser(id, first_name, last_name, username, bot, msg);
        // break;

        case keyboard_text.personal_accaunt.card:
            console.log("Пользователь " + username + " нажал кнопку Карта");
            personal_card_user.personalCardUser(id, first_name,last_name,username,bot,msg)
        break;

        case keyboard_text.main.menu:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Меню");
            bot.sendMessage(id, "Выберите интересующие вас категории, " + user.rows[0].first_name + "!", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: keyboards.menu
                }
            });
        break;
 
        case keyboard_text.menu.soup:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Суп");
            choise_dish.choiseDish(bot,id,username)
        
        break;

        case keyboard_text.back:
            console.log("Пользователь " + username + " нажал кнопку НАЗАД");
            bot.sendMessage(id, "Вы вернулись в меню", {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboards.main
                }
            });
        break;    
    }
})

bot.on("callback_query", query => {
    const { id } = query.message.chat;
    const { data } = query;
    const { username } = query.message.chat;
    console.log(data);
    adress.registration(id, data, username, bot, query);
})