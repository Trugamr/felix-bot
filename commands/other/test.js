const commando = require('discord.js-commando');

const bot = new commando.Client();

class test extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'other',
            memberName: 'test',
            description: 'test'
        });
    }

    async run(message, args) {
        message.channel.sendMessage('Type **1** or **2**')
            .then(() => {
                message.channel.awaitMessages(response => response.content === "1", {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    })
                    .then((collected) => {
                        message
                            .channel
                            .sendMessage(`The collected message was: ${collected.first().content}`);
                            console.log(collected.first().content);
                    })
                    .catch(() => {
                        message
                            .channel
                            .sendMessage('There was no collected message that passed the filter within the time limit!');
                    });

                    message.channel.awaitMessages(response => response.content === "2", {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    })
                    .then((collected) => {
                        message
                            .channel
                            .sendMessage(`The collected message was: ${collected.first().content}`);
                            console.log(collected.first().content);
                    })
                    .catch(() => {
                        message
                            .channel
                            .sendMessage('There was no collected message that passed the filter within the time limit!');
                    });
            });

            var allArgs = args.split(" ");
        var typeArg = allArgs[0].toString().replace(" ", "").toLowerCase(),
            searchArg = args.toString().replace(allArgs[0] + " ", "");
        if(typeArg != "movie"){
            if(typeArg != "series") {
                message.channel.sendMessage("omdb command usage : [p]omdb **[type]** **[title]**" + "\n" + "**type : ** movie or series \n");
                return;
            }
        }
        
    }
}
module.exports = test;