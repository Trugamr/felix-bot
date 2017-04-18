const commando = require('discord.js-commando');

class pong extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pong',
            group: 'other',
            memberName: 'pong',
            description: 'ping'
        });
    }

    async run(message, args) {
        message.channel.send('ping');
    }
}

module.exports = pong;