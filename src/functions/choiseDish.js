const DB = require("../connect_db");
const Client  = require('pg');

async function choiseDish(bot, id, username)
{
    try 
    {
        database = new Client.Pool(DB);
        var queryUser = 'SELECT name_dish, description FROM public."Dish"';
        var dish_name = await database.query(queryUser);

        await bot.sendDocument(id, "img/sup.gif", {})
        if(dish_name.rows[0] != null) {
            // console.log(element.name_dish)
            dish_name.rows.forEach(element => {
            bot.sendMessage(id, element.description, {
                reply_markup:
                {
                    inline_keyboard:
                    [
                        [{text: "\uD83C\uDF72" + element.name_dish, callback_data: element.name_dish }]       
                    ]
                },
                parse_mode: "HTML"
            })
            })
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