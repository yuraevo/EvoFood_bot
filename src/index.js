const bot = require("./bot");
const bot_command = require("./bot_commands");
const keyboards = require("./keyboard");
const keyboard_text = require("./keyboard_text");
const choise_country = require("./functions/findUser");
const adress = require("./functions/registration_user");
const personal_card_user = require("./functions/personal_card_user");
const choise_dish = require("./functions/choiseDish");
const inline_keyboard_dish_description = require("./functions/inline_keyboard_dish_description");
const inline_keyboard_add_to_card = require("./functions/inline_keyboard_add_to_card")
const basket = require("./functions/basket")
const switch_text = require("./functions/switch_text")

// const token = require("./token")
// const TOKEN = token.TOKEN

// bot.openWebHook()
// bot.setWebHook(`http://5bbc89bd.ngrok.io/bot${TOKEN}`)

bot_command(); 

bot.on("message", msg => {

    const { id } = msg.chat;
    const { username } = msg.chat;
    const { first_name } = msg.chat;
    const { last_name } = msg.chat;

    switch(msg.text) {

        case keyboard_text.main.personal_accaunt: 
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку ЛИЧНЫЙ КАБИНЕТ");
            choise_country.findUser(id, first_name, last_name, username, bot, msg);
        break;

        case keyboard_text.personal_accaunt.card:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку Карта");
            personal_card_user.personalCardUser(id, first_name,last_name,username,bot,msg)
        break;

        case keyboard_text.main.menu:
            //bot.deleteMessage(id, msg.chat.message_id),
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку Меню");
            bot.sendMessage(id, "Выберите интересующие вас категории, " + user.rows[0].first_name + "!", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: keyboards.menu
                }
            });
        break;

        case keyboard_text.main.basket:
            bot.sendChatAction(id, "typing");
            console.log("Пользователь " + username + " нажал кнопку МОИ ЗАКАЗЫ");
            basket.show_basket(bot, id, first_name, username);

        break;

        case keyboard_text.menu.drinks:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку НАПОЇ");
            bot.sendMessage(id, "Выберите интересующие вас категории, " + user.rows[0].first_name + "!", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: keyboards.drinks
                }
            });
        break;
 
        case keyboard_text.menu.soup:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Суп");
            choise_dish.choiseDish(bot, id, first_name, username, "Супы")
        break;

        case keyboard_text.menu.hot_meal:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Горячие блюда");
            choise_dish.choiseDish(bot, id, first_name, username, "Горячие блюда")
        break;

        case keyboard_text.menu.on_the_grill:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку НА МАНГАЛЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "На мангале")
        break;

        case keyboard_text.menu.salads:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку САЛАТЫ");
            choise_dish.choiseDish(bot, id, first_name, username, "Салаты")
        break;

        case keyboard_text.menu.rolls:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Роллы");
            choise_dish.choiseDish(bot, id, first_name, username, "Роллы")
        break;

        case keyboard_text.menu.pizza:
            bot.sendChatAction(id, "typing")
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Пиццы");
            choise_dish.choiseDish(bot, id, first_name, username, "Пиццы")
        break;

        case keyboard_text.drink.tea:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку ЧАЙ");
            choise_dish.choiseDish(bot, id, first_name, username, "Чай");
        break;

        case keyboard_text.drink.coffee:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку КОФЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "Кофе");
        break;

        case keyboard_text.drink.juice:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку Соки");
            choise_dish.choiseDish(bot, id, first_name, username, "Соки");
        break;

        case keyboard_text.drink.water:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку ВОДА");
            choise_dish.choiseDish(bot, id, first_name, username, "Вода");
        break;

        case keyboard_text.drink.cocktail:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку  КОКТЕЙЛЬ");
            choise_dish.choiseDish(bot, id, first_name, username, "Коктейль");
        break;

        case keyboard_text.drink.wine:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку  ВИНО");
            choise_dish.choiseDish(bot, id, first_name, username, "Вино");
        break;

        case keyboard_text.drink.strong_alcohol:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку  КРЕПКИЙ АЛКОГОЛЬ");
            choise_dish.choiseDish(bot, id, first_name, username, "Крепкий алкоголь");
        break;

        case keyboard_text.menu.sweet:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку СЛАДКОЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "Сладкое");
        break;

        case keyboard_text.back:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку НАЗАД");
            bot.sendMessage(id, "Вы вернулись в меню", {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboards.main
                }
            });
        break; 

        case keyboard_text.back_in_menu:
            bot.sendChatAction(id, "typing")
            console.log("Пользователь " + username + " нажал кнопку НАЗАД");
            bot.sendMessage(id, "Вы вернулись в меню", {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboards.menu
                }
            });
        break;   
    }
})

bot.on("callback_query", query => {
    const { id } = query.message.chat;
    const { data } = query;
    const { username } = query.message.chat;
    const { first_name } = query.message.chat;
    const { last_name } = query.message.chat;
    console.log(data);
    adress.registration(id, data, first_name, last_name, username, bot, query);
    inline_keyboard_dish_description.inline_keyboard_dish_description(id, data, username, bot, query);
    inline_keyboard_add_to_card.inline_keyboard_add_to_card(id, data, username, bot, query);
    switch_text.switch_text(id, data, first_name, last_name, username, bot, query);
})