const commando = require('discord.js-commando');
const TVDB = require('node-tvdb');

const API_KEY = "2A7B387A7D6BC48F";

const tvdb = new TVDB(API_KEY);

class tvdbInfo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'tv',
            group: 'tvdb',
            memberName: 'tv',
            description: 'TV show Info.'
        });
    }

    async run(message, args) {
        tvdb.getSeriesByName(args)
            .then(response => {
                var seriesName = response[0].seriesName,
                    status = response[0].status,
                    banner = "http://thetvdb.com/banners/" + response[0].banner,
                    firstAired = response[0].firstAired,
                    id = response[0].id,
                    network = response[0].network,
                    overview = response[0].overview;
                message.channel.send(banner + "\n" + "**Series Name** : " + seriesName + "\n" + "**Network : **" + network + "\n" +  "**First Aired** : " + firstAired + "\n" + 
                "**Status** : " + status + "\n" + "**Overview** : " + overview + "\n" + id);
                console.log(response);

                tvdb.getSeriesById(id)
                .then(response => {
                    console.log(response);
                 })
                .catch(error => { 
                    console.log(error);
                 });
                
             })
            .catch(error => {
                message.channel.send("Sorry, I wan't able to find anything about " + args);
                console.log(error);
            });

    }
}

module.exports = tvdbInfo;