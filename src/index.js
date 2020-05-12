const bot = require("./bot");
const bot_command = require("./bot_commands");
const keyboards = require("./keyboard");
const keyboard_text = require("./keyboard_text");
const func = require("./functions/findUser");
const adress = require("./functions/registration_user");
const personal_card_user = require("./functions/personal_card_user");
const choise_dish = require("./functions/choiseDish");
const addToCard = require("./functions/inline_keyboard_dish_description");

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

        case keyboard_text.menu.drinks:
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
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Суп");
            choise_dish.choiseDish(bot, id, first_name, username, "Супы")
        break;

        case keyboard_text.menu.hot_meal:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Горячие блюда");
            choise_dish.choiseDish(bot, id, first_name, username, "Горячие блюда")
        break;

        case keyboard_text.menu.on_the_grill:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку НА МАНГАЛЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "На мангале")
        break;

        case keyboard_text.menu.salads:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку САЛАТЫ");
            choise_dish.choiseDish(bot, id, first_name, username, "Салаты")
        break;

        case keyboard_text.menu.rolls:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Роллы");
            choise_dish.choiseDish(bot, id, first_name, username, "Роллы")
        break;

        case keyboard_text.menu.pizza:
            //bot.deleteMessage(id, msg.chat.message_id),
            console.log("Пользователь " + username + " нажал кнопку Пиццы");
            choise_dish.choiseDish(bot, id, first_name, username, "Пиццы")
        break;

        case keyboard_text.drink.tea:
            console.log("Пользователь " + username + " нажал кнопку ЧАЙ");
            choise_dish.choiseDish(bot, id, first_name, username, "Чай");
        break;

        case keyboard_text.drink.coffee:
            console.log("Пользователь " + username + " нажал кнопку КОФЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "Кофе");
        break;

        case keyboard_text.drink.juice:
            console.log("Пользователь " + username + " нажал кнопку Соки");
            choise_dish.choiseDish(bot, id, first_name, username, "Соки");
        break;

        case keyboard_text.drink.water:
            console.log("Пользователь " + username + " нажал кнопку ВОДА");
            choise_dish.choiseDish(bot, id, first_name, username, "Вода");
        break;

        case keyboard_text.drink.cocktail:
            console.log("Пользователь " + username + " нажал кнопку  КОКТЕЙЛЬ");
            choise_dish.choiseDish(bot, id, first_name, username, "Коктейль");
        break;

        case keyboard_text.drink.wine:
            console.log("Пользователь " + username + " нажал кнопку  ВИНО");
            choise_dish.choiseDish(bot, id, first_name, username, "Вино");
        break;

        case keyboard_text.drink.strong_alcohol:
            console.log("Пользователь " + username + " нажал кнопку  КРЕПКИЙ АЛКОГОЛЬ");
            choise_dish.choiseDish(bot, id, first_name, username, "Крепкий алкоголь");
        break;

        case keyboard_text.menu.sweet:
            console.log("Пользователь " + username + " нажал кнопку СЛАДКОЕ");
            choise_dish.choiseDish(bot, id, first_name, username, "Сладкое");
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

        case keyboard_text.back_in_menu:
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
    console.log(data);
    adress.registration(id, data, username, bot, query);
    addToCard.addToCard(id, data, username, bot, query);
})