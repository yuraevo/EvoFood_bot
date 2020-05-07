const DB = require("../connect_db");
const Client  = require('pg');

async function choiseDish(bot, id, username)
{
    try 
    {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT name_dish FROM public."Dish"';
        dish_name = await database.query(queryUser);
        if(dish_name.rows[0] != null) {
            //var el = dish_name.rows[element].toString()
            bot.sendDocument(id, "img/sup.gif", {
                reply_markup:
                {
                    inline_keyboard:
                    [
                        
                        
                        dish_name.rows.forEach(element => {
                            console.log(element.name_dish)
                                [ {text: '\uD83C\uDF72' + element.name_dish.toString(), callback_data: element.name_dish }]
                                // [ {text: "\uD83C\uDF72Сицилийский суп", callback_data: "Силицийский суп" }],
                                // [ {text: "\uD83C\uDF72Суп с курицей и лапшой", callback_data: "Суп с курицей и лапшой" }],
                                // [ {text: "\uD83C\uDF72Суп-пюре из тыквы с креветками", callback_data: "Суп-пюре из тыквы с креветками" }], 
                                // [ {text: "\uD83C\uDF72Солянка мясная", callback_data: "Солянка мясная"}], 
                                // [ {text: "\uD83C\uDF72Куриный бульйон с пельменями", callback_data: "Куриный бульйон с пельменями" }], 
                                // [ {text: "\uD83C\uDF72Борщ", callback_data: "Борщ" }], 
                       
                            })
                            ]
                        }
                    });
        }
    }
    catch(ex) 
    {
        console.log('Something wrong happend - ' + ex)
    }
    finally
    {
        await database.end()
        console.log("DB disconnect")
    }
}

module.exports.choiseDish = choiseDish;