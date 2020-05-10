const DB = require("../connect_db");
const Client  = require('pg');

async function choiseDish(bot, id, first_name, username, category)
{
    try 
    {
        if (category === "Супи")
        {
            database = new Client.Pool(DB);
            var queryUser = 'SELECT name_dish, description, cost FROM public."Dish"';
            var dish_name = await database.query(queryUser);
            var opts = { inline_keyboard: [] }
            dish_name.rows.forEach(element => {
                opts.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF72 " + element.name_dish + " $" + element.cost, callback_data: element.name_dish }
                    ]);
            })
            if(dish_name.rows[0] != null) {

                CHOISESOUP = `
                   <b> ${first_name}</b>, Ваш вибір пав на підрозділ <i>Супи</i> \uD83C\uDF72 

<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/sup.gif", {
                    caption: CHOISESOUP,
                    parse_mode: "HTML",
                    reply_markup: opts
                })
            }
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