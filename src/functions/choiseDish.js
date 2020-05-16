const DB = require("../connect_db");
const Client  = require('pg');

async function choiseDish(bot, id, first_name, username, category)
{
    try {
        if (category === "Супы") {
            database = new Client.Pool(DB);
            var queryUser = `SELECT name_dish, description, cost, category 
                            FROM public."Dish" JOIN public."Category_Dish" 
                            ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name = await database.query(queryUser);
            var opts = { inline_keyboard: [] };
            dish_name.rows.forEach(element => {
                opts.inline_keyboard.push(
                    [
                        {text:"\uD83C\uDF72 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name.rows[0] != null) { 
TEXT = `
<b>🤍${first_name}, </b><i>суп любим во всем мире, во всех кухнях 🍲</i>

<i>Одна 🇪🇸 испанская пословица гласит:<\/i> <b>«Из супа и любви первое слово дороже второго»</b> 

<i>Конечно, горячие испанцы слегка преувеличили, но суп – это действительно одно из самых комфортных и вкусных блюд.</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/sup.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts
                });
            }
        }
        else if (category === "Горячие блюда") {
            database = new Client.Pool(DB);
            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🔥 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
TEXT = `
<b>💛 ${first_name}</b>, <i>перед Вами самые горячие блюда нашего заведения 🔥 </i>


<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/zakaz.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }
        else if (category === "На мангале") {
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
                        {text:"🥓"  + element.name_dish, callback_data: element.name_dish }
                    ]);
            })
            if(dish_name2.rows[0] != null) {
TEXT = `
<b>${first_name}</b>, <i>мангал и тандыр, который полностью меняет идеологию приготовления блюда 🍗</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/mangal.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }
        else if (category === "Салаты") {
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
                        {text:"\uD83E\uDD57 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })
            if(dish_name2.rows[0] != null) {
TEXT = `
<b>💚${first_name}</b>, <i>если обратиться к Википедии, то сала́т — это холодное блюдо из кусочков овощей, зелени, различных других растений, грибов, с добавлением приправы 🥗

Но как бы просто это не звучало, вкус наших салатов Вы запомните надолго!</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/salad.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }
        else if (category === "Роллы") {
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
                        {text:"\uD83C\uDF63 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })
            if(dish_name2.rows[0] != null) {
TEXT = `
<b>🤍${first_name}</b>, <i>наши мастера кулинарии – профессиональные повара, совершенствуют восточные изыски, вносят в них нотки креатива 
и придают особенный шарм. В результате их труда появились необычные роллы и не менее необычные суши. Все роллы от нашего заведения отличает высокое качество продуктов и отменный вкус</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/rolls.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }
        else if (category === "Пиццы") {
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
                        {text:"\uD83C\uDF55 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
TEXT = `
<b>${first_name}</b>, <i>пицца - суперзвезда итальянской кухни. Национальное блюдо с хрустящим тестом, сочной начинкой, 
расплавленным сыром и ароматным томатным соусом - воплощение вкуса к жизни и просто невероятно аппетитная здоровая еда</i> 🍕 

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/pizza.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }
        else if (category === "Чай") {
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
                        {text:"☕ " + element.name_dish, callback_data: element.name_dish }
                    ]);
            })
            if(dish_name2.rows[0] != null) {
                TEXT = `
<b>${first_name}</b>, что может быть более расслабляющим, чем чашка чая в уютном месте?🍵

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/tea.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }
        else if (category === "Кофе") {
            database = new Client.Pool(DB);
            var queryUser2 = ` SELECT name_dish, description, cost, category 
                            FROM public."Dish" 
                            JOIN public."Category_Dish" ON public."Category_Dish".id = public."Dish".category 
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"☕ " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
                TEXT = `
<b>${first_name}</b>, что может взбодрить, как не кофе? ☕

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/coffee.gif", {
                    caption: TEXT,
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
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🧃 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
                TEXT = `
<b>${first_name}</b>, <i>свежевыжатые соки – это натуральный напиток, который производится из свежих фруктов, овощей, зелени, корнеплодов,  
и подлежит употреблению сразу после отжима. В такие соки не принято добавлять подсластители или другие добавки</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/juice.gif", {
                    caption: TEXT,
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
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🌊 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
                TEXT = `
<b>${first_name}</b>, <i>давайте бороться с жаждой вместе?</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/water.gif", {
                    caption: TEXT,
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
                            WHERE public."Category_Dish".name = '${category}'`;
            var dish_name2 = await database.query(queryUser2);
            var opts2 = { inline_keyboard: [] };
            dish_name2.rows.forEach(element => {
                opts2.inline_keyboard.push(
                    [
                        {text:"🍹 " + element.name_dish, callback_data: element.name_dish }
                    ]);
            });
            if(dish_name2.rows[0] != null) {
                TEXT = `
<b>${first_name}</b>, <i>Алкогольным коктейлем считается напиток в котором в качестве одного или нескольких ингредиентов используют спиртные напитки. 
Сам же коктейль получается от смешивания нескольких жидкостей, а иногда и с добавлением специй и фруктов 🍹</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;

                await bot.sendDocument(id, "img/cocktail.gif", {
                    caption: TEXT,
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
                TEXT = `
<b>${first_name}</b>, <i>вину посвящено немало высказываний великих людей. Вино ругают, вино восхваляют, 
над ним шутят, но никого этот напиток не оставляет равнодушным 🍷</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/wine.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                });
            }
        }
        else if (category === "Крепкий алкоголь") {
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
                TEXT = `
<b>${first_name}</b>, <i> итак, сначала определим, какой алкоголь подпадает под эту категорию. 
Крепкими напитками называют такие, в которых содержание алкоголя превышает 20%. 
В некоторых классификациях пороговым числом становится 28% 🥃</i>

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/strong_alchogol.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }

        else if (category === "Сладкое") {
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
                TEXT = `
<b>${first_name}</b>, <i>гастрономические традиции сладкого мира – это бесконечное путешествие. Список десертов и тортов в этом плане не исключение.</i>🍰

<strong>Заказывайте, будет вкусно! \uD83D\uDE4C </strong>`;
                await bot.sendDocument(id, "img/sweet.gif", {
                    caption: TEXT,
                    parse_mode: "HTML",
                    reply_markup: opts2
                })
            }
        }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
        console.log("DB disconnect")
    }
}

module.exports.choiseDish = choiseDish;