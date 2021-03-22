const package = require('./package.json');
const variables = require('./variables.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const owner = variables.ownerID // modify variables.json

function setValue(id, amount) {
  fs.readFile('./eco.json', 'utf8', function(err, data) {
    if (err) throw err
    var obj = JSON.parse(data);
    eval(`obj.id${id} = ${amount}`)
    var jsonback = JSON.stringify(obj)
    fs.writeFile("./eco.json", jsonback, (err) => {
      if(err){console.error(err);return}
    })
  })
}

function addTime(modifier, id, amount)

var args = process.argv.slice(2);
switch (args[0]) {
    case 'start':
    console.log("--------------------");
    console.log("Ecobot, made by Circular");
    console.log("https://circularsprojects.com");
    console.log("Current version: PRERELEASE v1.0");
    console.log("--------------------");
    break;
    case 'clear':
    fs.writeFile("./eco.json", "{}", function (err) {
      console.log("Cleared all data.")
      process.exit(0)
    });
    break;
    default:
    console.log("Commands are:")
    console.log("node index.js start - Start ecobot")
    console.log("node index.js clear - Clear all economy data")
    process.exit(0);
    break;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.author.tag == client.user.tag) {return;}
  var tempValue;
  var Value;
  fs.readFile('./eco.json', 'utf8', function (err, data) {
    if (err) throw err;
    tempValue = JSON.parse(data);
    var args = message.content.split(" ");
    switch (args[0]) {
      case '!balance':
      try {
        eval(`Value = tempValue.id${message.author.id}`)
        if (Value == undefined) {
          setValue(message.author.id, 0)
          message.channel.send(`You do not have a wallet. Creating one for you...`);
          return;
        }
        message.channel.send(`Your balance is: ${Value}`)
      } catch(err) {
        setValue(message.author.id, 0)
        message.channel.send(`You do not have a wallet or something else has happened. Attempting to create a wallet for you...`);
        message.channel.send(`This was caused by an internal error and has been reported to the developer.`)
        console.log(`[INTERNAL ERROR] ${err}`)
      }
      console.log(`User ID ${message.author.id}, ${message.author.tag} requested balance. User balance: ${Value}`)
      break;
      case '!modify':
      if (message.author.id == owner) {
        if (args[1] && args[2]) {
          if (args[1].length == 18) {
            setValue(args[1], args[2]);
            message.channel.send(`Set ${args[1]} to ${args[2]}`)
            console.log(`User ID ${message.author.id}, ${message.author.tag} set balance of ${args[1]} to ${args[2]}`)
          } else {
            message.channel.send("Unexpected ID.")
          }
        } else {
          message.channel.send("!modify [ID] [AMOUNT]")
        }
      } else {
        message.channel.send("no silly")
      }
      break;
      case '!work':
      var amount = Math.floor((Math.random() * 500) + 1)
      break;
    }
  })
});

client.login(variables.botToken);
