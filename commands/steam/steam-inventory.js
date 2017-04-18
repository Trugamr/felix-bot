const commando = require('discord.js-commando');
var getSteamID64 = require('customurl2steamid64/lib/steamid64');
var steamUserInventory = require('steam-user-inventory');

var userSteamId64;

class steamInventory extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'steam',
            group: 'steam',
            memberName: 'steam',
            description: 'Steam Inventory Scraper.'
        });
    }

    async run(message, args) {
        var username = args;
        var baseURL = "http://steamcommunity.com/id/";
        var URL = baseURL + username +  "/?xml=1";
        getSteamID64(URL).then(function (result) {
            userSteamId64 = result;
            steamUserInventory(username).then(data => {
                var i;
                var itemColor  = new Array(),
                    itemName = new Array();
                for(i = 0; i < data.length; i++) {
                    itemName[i] = data[i].name;
                    if(data[i].raw.tags[4] == undefined) {
                        itemColor[i] = "1447446";
                    } else {
                        itemColor[i] = parseInt(data[i].raw.tags[4].color, 16);
                    }
                }
                for(i = 0; i < itemName.length; i++) {
                    //message.channel.sendEmbed({ color: itemColor[i], description: itemName[i] }); 
                }

                message.channel.send(itemName);   

            });  
            console.log(result);
        });
        
    }
}

module.exports = steamInventory;