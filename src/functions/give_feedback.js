const DB = require("../connect_db");
const Client  = require('pg');
const registration = require("./userRegistration");
const keyboard_text = require("../keyboard_text");
const keyboards = require("../keyboard");
const text = require("../text");
const now = new Date();

async function give_feedback(bot, id, first_name, username)
{
    try {
        database = new Client.Pool(DB);
        let array = new Array(); 
        let uniqueItems = new Array(); //отзыв
        let array2 = new Array(); 
        let uniqueItems2 = new Array(); // оценка

        var SELECT_CLIENT_QUERY = `SELECT "Client".id 
                                FROM "Client" JOIN "User" ON "User".id = "Client".user
                                WHERE "User".username = ($1)`;  //поиск клиента в базе
        var INSERT_INTO_REVIEWS_QUERY = `INSERT INTO "Reviews"(client, review, date_of_review, assessment) 
                                    VALUES (($1), ($2), ($3), ($4))`;

        async function inputFeedback() {
            try {
               return await new Promise(async function(resolve) {
                   await bot.sendDocument(id, "img/ot.gif", {
                       parse_mode: "HTML",
                       caption: `<strong>💌 ${first_name}, надеемся мы Вам нравимся! \n\n💙По крайней мере мы будем все делать для этого! \n\nОставьте свой отзыв: </strong>`
                   });
                   await bot.on("message", msg => {
                            if(uniqueItems.length < 1) {
                                feedback = msg.text;
                                array.push(feedback);
                                uniqueItems = Array.from(new Set(array));
                                console.log("Вводит отзыв: " + uniqueItems);
                            }
                            resolve();
                    });
                });
            }
            catch(ex) {
                console.log('Что-то произошло - ' + ex);
            }
            finally { 
               
            }
        }

        async function inputAssessment() {
            try {
               return await new Promise(async function(resolve) {
                   await bot.sendMessage(id, `${first_name}, оставьте оценку для нашего сервиса, от 1 до 10:`, {});
                   await bot.on("message", msg => {
                            if(uniqueItems2.length < 1) {
                                assessment = msg.text;
                                array2.push(assessment);
                                uniqueItems2 = Array.from(new Set(array2));
                                console.log("Вводит оценку: " + uniqueItems2);
                            }
                            resolve();
                    });
                });
            }
            catch(ex) {
                console.log('Что-то произошло - ' + ex);
            }
            finally { 
               
            }
        }

        await inputFeedback();
        await inputAssessment();
        SELECT_CLIENT = await database.query(SELECT_CLIENT_QUERY, [username]); // взятие айди клиента
        console.log("Вывод отзыва: " + uniqueItems[0]);
        console.log("Вывод оценки: " + uniqueItems2[0]);
        INSERT_INTO_REVIEWS = await database.query(INSERT_INTO_REVIEWS_QUERY, [SELECT_CLIENT.rows[0].id, uniqueItems[0], now, uniqueItems2[0]]);
        if(uniqueItems2[0] >= 8 &&uniqueItems2[0] <= 10) {
            await bot.sendDocument(id, "img/otzyv.gif" , {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: 
                        [
                            [{text: "📟 Написать в поддержку", callback_data: `Поддержка` }]
                        ]
                },
                caption: `<strong>Вы ввели отзыв</strong> \n\n"<i>${uniqueItems[0]}</i>" \n\n <strong>и оценку</strong> "<i>${uniqueItems2[0]}</i>". \n\nВы оценили нас хорошо, спасибо! благодаря Вам мы становимся лучше!`
            });
        }
        else if(uniqueItems2[0] <= 7 && uniqueItems2[0] >= 5){
            await bot.sendDocument(id, "img/otzyv.gif" , {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: 
                        [
                            [{text: "📟 Написать в поддержку", callback_data: `Поддержка` }]
                        ]
                },
                caption: `<strong>Вы ввели отзыв</strong> \n\n"<i>${uniqueItems[0]}</i>" \n\n <strong>и оценку</strong> "<i>${uniqueItems2[0]}</i>". \n\nПо оценке видно, что мы должны лучше для Вас стараться! Все будет! Благодаря Вам мы становимся лучше!`
            });
        }
        else if(uniqueItems2[0] <= 4 && uniqueItems2[0] >= 1){
            await bot.sendDocument(id, "img/otzyv.gif" , {
                parse_mode: "HTML",
                caption: `<strong>Вы ввели отзыв</strong> \n\n"<i>${uniqueItems[0]}</i>" \n\n <strong>и оценку</strong> "<i>${uniqueItems2[0]}</i>". \n\nВы оценили нас плохо. Мы как можно скорее хотим это исправить. Напишите пожалуйста в поддержку, что Вам не понравилось. Спасибо, благодаря Вам мы становимся лучше!`,
                reply_markup: {
                    inline_keyboard: 
                        [
                            [{text: "📟 Написать в поддержку", callback_data: `Поддержка` }]
                        ]
                }
            });
        }

    }
    catch(ex) {
        console.log('Something wrong happend - ' + ex)
    }
    finally {
        await database.end()
    }
}

module.exports.give_feedback = give_feedback;