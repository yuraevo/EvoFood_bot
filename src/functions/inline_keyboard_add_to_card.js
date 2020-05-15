const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const choice_dish = require("./choiseDish")

async function inline_keyboard_add_to_card(id, data, username, bot, query) {
    try {
        database = new Client.Pool(DB);
        var queryUser = `SELECT 
                        name_dish, public."Category_Dish".name 
                        FROM public."Dish" 
                        JOIN public."Category_Dish" ON 
                        public."Category_Dish".id = public."Dish".category`;
        dish = await database.query(queryUser);
        if(dish.rows[0] != null) { 
            for (const element of dish.rows) {
                switch(data) {
                    case `К: ` + element.name_dish:
                        bot.answerCallbackQuery(query.id, "Ваш заказ " + element.name_dish + " в корзине");

                        let array = new Array();
                        let uniqueItems = new Array();
                        
                        async function add_to_card(array, uniqueItems) {
                            try {
                                return await new Promise(async function (resolve) {
                                    console.log("Зашло в адд то кард")
                                    var DISH_QUERY = `SELECT id
                                                    FROM public."Dish" WHERE name_dish = ($1)`;
                                    var CLIENT_ID_QUERY = `SELECT public."Client".id
                                                    FROM public."Client" JOIN public."User"
                                                    ON public."Client".user = public."User".id
                                                    WHERE public."User".username = ($1)`;

                                    SELECTED_DISH = await database.query(DISH_QUERY, [element.name_dish]); // айди выбранного блюда
                                    SELECTED_CLIENT = await database.query(CLIENT_ID_QUERY, [username]); // айди данного клиента

                                    if(SELECTED_DISH.rows[0] != null) { 
                                        if(SELECTED_CLIENT.rows[0] != null)  {
                                            async function inputQuantity(array, uniqueItems, clientID) {
                                                try {
                                                   return await new Promise(async function(resolve) {
                                                       bot.sendMessage(id, "Введите количество: ", {});
                                                       bot.on("message", msg => {
                                                                if(uniqueItems.length < 1) {
                                                                    adress = msg.text;
                                                                    array.push(adress);
                                                                    uniqueItems = Array.from(new Set(array));
                                                                    console.log("Вводит количества: " + uniqueItems);
                                                                    insert_into_order_dish(array, uniqueItems, clientID);
                                                                }
                                                            });
                                                            resolve();
                                                    });
                                                }
                                                catch(ex) {
                                                    console.log('Что-то произошло - ' + ex);
                                                }
                                                finally { 
                                                
                                                }
                                            }

                                            async function insert_into_order_dish(array, uniqueItems, clientID) {
                                                try {
                                                    database = new Client.Pool(DB);
                                                    await database.connect().then(console.log("Соединение установлено"));;
                                                    var INSERT_INTO_ORDER_DISH_QUERY = `SELECT * 
                                                                                FROM insert_into_order_dish($1, $2, $3)`; // Функция вставки в order_dish
                                                    console.log("Вывод количества: " + uniqueItems[0])
                                                    console.log("Вывод айди клиента: " + clientID)
                                                    await database.query(INSERT_INTO_ORDER_DISH_QUERY, [SELECTED_DISH.rows[0].id, uniqueItems[0], clientID]); //Исполнение функции
                                                }
                                                catch(ex) {
                                                    console.log('Что-то произошло- ' + ex);
                                                }
                                                finally {
                                                    await database.end()
                                                }
                                            }
                                            await inputQuantity(array, uniqueItems, SELECTED_CLIENT.rows[0].id)
                                            //await insert_into_order_dish(array, uniqueItems);
                                    }
                                    resolve()
                                }
                                }) 
                            }
                            catch(ex) {

                            }
                            finally {

                            }
                            
                        }
                        await add_to_card(array, uniqueItems)
                    break;

                    case `Н: ` + element.name_dish:
                        console.log("Зашло в нет")
                        console.log(element.category)
                        choice_dish.choiseDish(bot, id, query.message.chat.first_name, username, element.category);
                    break;
                    
                }
            }
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex);
    }
    finally {
        //await database.end()
        console.log("DB disconnect");
    }
}

module.exports.inline_keyboard_add_to_card = inline_keyboard_add_to_card;
