const Discord = require('discord.js');
const commando = require('discord.js-commando');


const bot = new commando.Client({
    owner: '148432996221845504',
    commandPrefix : '.',
}); 


bot.on('ready', () => {
    console.log('Magic Bag is OPEN.');
})

bot.registry.registerGroup('other', 'Other');
bot.registry.registerGroup('steam', 'Steam');
bot.registry.registerGroup('media', 'Media');
bot.registry.registerGroup('tvdb', 'TVDB');
bot.registry.registerGroup('omdb', 'OMDB');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message', (message) => {
    if(message.content == "rip felix") {
        message.reply("NO... I'm Alive !");
    }
});

bot.login('MzAxOTY5MTEzODU5ODgzMDEz.C9CuKw.7rCsNRdqeI0XeCbwyxsZBwvvWt8');

