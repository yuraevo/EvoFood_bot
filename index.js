const bot = require("./bot") 
const DB = require("./connect_db")
const bot_command = require("./bot_commands")

const bodyParser= require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false});

bot_command()

allClients()

async function findUser(id, first_name) {
    try {
        await DB.connect()
        const result = await DB.query("SELECT name FROM client WHERE name = ($1)", [first_name])
        bot.sendMessage(id, result.rows[0].name, {
            parse_mode: "Markdown"
        });
    }
    catch (ex) 
    {
        console.log('Something wrong happend: ' + ex)
    }
    finally {
        await DB.end()
        console.log("DB disconnect")
    }
}
async function allClients() {
    try 
    {
        bot.on('message', msg => {
            const { id } = msg.chat
            const { first_name } = msg.chat
            const { username } = msg.chat
            console.log(id)
            console.log(username)
            findUser(id, first_name)
        })
    }
    catch (ex) 
    {
        console.log('Something wrong happend: ' + ex)
    }
    finally {
    }
}