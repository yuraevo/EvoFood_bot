const DB = require("../connect_db")
const Client  = require('pg');
const registration = require("./userRegistration")
const keyboard_text = require("../keyboard_text")
const keyboards = require("../keyboard")
const text = require("../text")
const lodash = require('lodash');

async function choiseAdress(id, data, username, bot, query) {
    try {
        switch(data) {
            case "Ukraine":
                database = new Client.Pool(DB);
                bot.answerCallbackQuery(query.id, "Ви обрали Україну");
                bot.sendMessage(id, text.choiceCity, {
                           parse_mode: "HTML",
                           reply_markup: {
                              inline_keyboard:
                               [
                                  [{ text: "Одеса\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Odessa" }],
                                  [{ text: "Київ\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Kyiv" }],
                                   [{ text: "Миколаїв\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Mykolaiv" }],
                                   [{ text: "Херсон\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Cherson" }],
                                   [{ text: "Львів\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Lviv" }],
                                ]
                            }
                        });
                    break;
        
                    case "Odessa":
                            database = new Client.Pool(DB);
                            var adress;
                            var phone;
                            var array = new Array();
                            var uniqueItems;
                        
                            var promisok = new Promise(function(res, rej) {
                               console.log("зашло в пррмис")
                               res()
                            })
                            promisok
                            .then(async function setAdress() {
                                return await new Promise(function (res, rej) {
                                    console.log("Зашло в сет адрес")
                                    bot.sendMessage(id, "Введите адрес: ", {});
                                    bot.on("message", msg => {
                                        text = msg.text;
                                        adress = text;
                                        array.push(adress);
                                        console.log("Адрес в промисе: " + adress)
                                        uniqueItems = Array.from(new Set(array))
                                        console.log(uniqueItems);
                                    })
                                    res("HHFHF")
                                })
                            })
                            .then(async function setPhone() {
                                return await new Promise(function (res, rej) {
                                    console.log("Зашло в сет phone")
                                    bot.sendMessage(id, "Введите телефон: ", {});
                                    bot.on("message", msg => {
                                        text = msg.text;
                                        phone = text;
                                        // phone = msg.text;
                                        array.push(phone);
                                        console.log("Телефон в промисе: " + phone);
                                        uniqueItems = Array.from(new Set(array));
                                        console.log(uniqueItems);
                                    })
                                    res()
                                })
                            })
                            .then(console.log(uniqueItems))
                            .catch(err => console.log(err));
        
                    break;
        
               
                }
    }
    catch(ex) {

    }
    
}



async function choiceAdress2(id, data, username, bot, query) {
    try {
        console.log("Зашло в choiseAdress");
        console.log(data);

            switch(data) {
                case "Ukraine":
                    database = new Client.Pool(DB);
                     
                    //insert = await database.query(choiceCity, ['Ukraine']);
                    bot.answerCallbackQuery(query.id, "Ви обрали Україну");
                    bot.sendMessage(id, text.choiceCity, {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard:
                            [
                                [{ text: "Одеса\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Odessa" }],
                                [{ text: "Київ\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Kyiv" }],
                                [{ text: "Миколаїв\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Mykolaiv" }],
                                [{ text: "Херсон\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Cherson" }],
                                [{ text: "Львів\uD83C\uDDFA\uD83C\uDDE6", callback_data: "Lviv" }],
                            ]
                        }
                    });
                break;
                case "Odessa":
                    database = new Client.Pool(DB);
                    let adress;
                    let phone;
                    let array = new Array();
                    let uniqueItems;
                    let timerId = setInterval(mob, 10000)

                    //  promise = new Promise(function(resolve, reject) {
                    //     bot.sendMessage(id, "Введите адрес: ", {});
                    //     bot.on("message", msg => {
                    //         resolve = msg.text;
                    //         adress = resolve;

                    //         array.push(adress);
                    //         console.log("Адрес в промисе: " + adress)
                    //         uniqueItems = Array.from(new Set(array))
                    //         console.log(uniqueItems);
                    //     });
                    //   });

                      
                   async function adressok()
                    {
                        return await new Promise( resolve => {
                            bot.sendMessage(id, "Введите адрес: ", {});
                            bot.on("message", msg => {
                               // resolve = msg.text;
                                adress = msg.text;

                                array.push(adress);
                                console.log("Адрес в промисе: " + adress)
                                uniqueItems = Array.from(new Set(array))
                                console.log(uniqueItems);
                                if(!!array.length)
                                    {
                                        console.log("Зашло туда куда нужно")
                                        clearInterval(timerId);
                                        mob()
                                    }
                            })
                            resolve("nfjfd")
                            //bot.answerCallbackQuery(query.id, "Ви ввели алрес")
                        }) 
                    }
                    async function mob()
                    {
                        return await new Promise( resolve => {
                            bot.sendMessage(id, "Введите телефон: ", {});
                            bot.on("message", msg => {
                                //resolve = msg.text;
                                phone = msg.text;
                                // phone = msg.text;
                                array.push(phone);
                                console.log("Телефон в промисе: " + phone);
                                uniqueItems = Array.from(new Set(array));
                                console.log(uniqueItems);
                            })
                            resolve("jdjf")
                           // bot.answerCallbackQuery(query.id, "Ви ввели номер");
                           
                         })
                        //continue;
                        
                    }
                   // clearTimeout(timerId);
                    await adressok()
                      //mob()
                     //await mob()
                   //let pr =  new Promise(resolve =>{
                   //mob()
                   // resolve
                  // })

                   console.log(uniqueItems)
                //    await bot.answerCallbackQuery(query.id, "Ви обрали Одесу");
                // promise.then(function setNumber() {
                //    // return new Promise(function (res,rej) {
                //     bot.sendMessage(id, "Введите телефон: ", {});
                //         bot.on("message", msg => {
                //             //res = msg.text;
                //            // phone = res;
                //             phone = msg.text;
                //             array.push(phone);
                //             console.log("Телефон в промисе: " + phone);
                //             uniqueItems = Array.from(new Set(array));
                //             console.log(uniqueItems);
                //         })
                //     //})
                // }).then(console.log("КОнец кейс" + uniqueItems)).catch(err => console.log(err));
                    // mob()
                   
                      
                  // })
                        //  console.log("Адрес: " + adress);
                        //  console.log("Телефон" + phone);
                        // var idOdessa = 'SELECT id FROM public."City" WHERE name_city = ($1)';
                        // Odessa = await database.query(idOdessa, ["Odessa"]);
                        // console.table(Odessa.rows[0].id);
                       // var insertFirstNameNewUser = 'INSERT INTO public."Adress" (city, street) VALUES ($1, $2)';
                        //insertStreet = await database.query(insertFirstNameNewUser, [Odessa.rows[0].id, 'ooo']);
                break;
            }
    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
        console.log("DB disconnect choiseAdress")
    }
}

module.exports.choiceAdress2 = choiceAdress2;