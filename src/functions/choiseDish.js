const DB = require("../connect_db");
const Client  = require('pg');

async function choiseDish(bot, id, first_name, username, category)
{
    try {
        if (category === "Супи") {
            database = new Client.Pool(DB);

            var queryUser = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" JOIN public."Category_Dish" 
                            ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Супи'`;

            var dish_name = await database.query(queryUser);
            var opts = { inline_keyboard: [] };

            dish_name.rows.forEach(element => {
                opts.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF72 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            
            if(dish_name.rows[0] != null) {

                CHOISESOUP = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Супи</i>.
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/sup.gif", {
                    caption: CHOISESOUP,
                    parse_mode: "HTML",
                    reply_markup: opts
                });
            }
        }

        else if (category === "Спекотні страви")
        {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Спекотні страви'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF7D " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Спекотні страви</i> \uD83C\uDF7D 

<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/zakaz.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }

        else if (category === "На мангалі")
        {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'На мангалі'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF56 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>На мангалі</i> \uD83C\uDF7D 

<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/mangal.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }

        else if (category === "Салати")
        {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Салати'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"\uD83E\uDD57 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Салати</i> \uD83C\uDF7D 
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/salad.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Роли")
        {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Роли'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF63 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Роли</i> \uD83C\uDF7D 
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/rolls.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Піци")
        {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Піци'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF55 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Піци</i> \uD83C\uDF7D 
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/pizza.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Чай") {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Чай'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"☕ " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Чай</i>☕
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/tea.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Кава") {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Кава'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"☕ " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Кава</i>☕
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/coffee.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }


        else if (category === "Соки") {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Соки'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🧃 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Соки</i>🧃
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/juice.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }


        else if (category === "Вода") {
            database = new Client.Pool(DB);

            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Вода'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🚰 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>Вода</i>🚰
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/water.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }


        else if (category === "Коктейль") {
            database = new Client.Pool(DB);

            var queryUser2 = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = 'Коктейль'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🍹 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>${category}</i>🍹
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/cocktail.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }

        else if (category === "Вино") {
            database = new Client.Pool(DB);

            var queryUser2 = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] }
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🍷 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>${category}</i>🍹
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/wine.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }

        else if (category === "Міцний алкоголь") {
            database = new Client.Pool(DB);

            var queryUser2 = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🥃 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>${category}</i>🥃
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/strong_alchogol.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Солодке") {
            database = new Client.Pool(DB);

            var queryUser2 = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;

            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] }
            
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🍰 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })

            if(dish_name2.rows[0] != null) {

                CHOISE_HOT_MEAL = `
<b>${first_name}</b>, Ваш вибір пав на підрозділ <i>${category}</i>🍰
<strong>Замовляйте! Буде смачно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/sweet.gif", {
                    caption: CHOISE_HOT_MEAL,
                    parse_mode: "HTML",
                    reply_markup: opts2
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