const commando = require('discord.js-commando');
const omdb = require('omdbapi');
const Discord = require('discord.js');

var fiveRes = new Array();

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class movie extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'movie',
            group: 'media',
            memberName: 'movie',
            description: 'Grabs Movie Info from Open Movie Database.'
        });
    }

    async run(message, args) {
        toTitleCase(args);
        if(args == null || args == "") { message.channel.sendMessage("use** .movie** **[search]**"); return; }
        omdb.search({
            search: args,                   // required
            type: "movie",                  // optionnal  ['series', 'episode', 'movie']
            //year: '2011',                 // optionnal
            //page: '1'                     // otionnal (1 to 100)
        }).then(res => {         
            for(var i = 0; i < 5; i++) {
                try {
                fiveRes[i] ="**" + (i+1) + ".** " + res[i].title + " (" + res[i].year + ")";
                } catch(err) {
                    fiveRes[i] = "";
                }
        
            }
            message.channel.sendMessage(fiveRes).then(() => {
                message.channel.awaitMessages(response => response.content < 6 , {
                        max: 1,
                        time: 10000,
                        errors: ['time']
                    })
                    .then((collected) => {
                        var coll = parseInt(collected.first().content) - 1 ;
                        if(coll > 5 || coll <0) {
                            message.channel.sendMessage("**" + coll + "**" + " is not a valid choice.")
                        }
                        var Title = res[coll].title,
                            Year = res[coll].year,
                            ImdbId = res[coll].imdbid,
                            Poster = res[coll].poster;
                        omdb.get({
                            id: ImdbId,
                        }).then(res => {

                            var movTitle = res.title,
                                movYear = res.year,
                                movRated = res.rated,
                                movReleased = res.released,
                                movRuntime = res.runtime,
                                movGenre = res.genre[0],
                                movDirector = res.director,
                                movPlot = res.plot,
                                movLanguage = res.language,
                                movCountry = res.country,
                                movAwards = res.awards,
                                movPoster = res.poster,
                                movImdbRating = res.imdbrating,
                                movProduction = res.production,
                                movWebsite = res.website.replace("http://", ""),
                                movColor;
                            var movGenreArr = new Array();
                            for(var i = 0; i < 3; i++) {
                                movGenreArr[i] = res.genre[i];
                            }
                            
                            const embed = new Discord.RichEmbed()
                                .setImage(movPoster.replace("SX300", "SX1000"))
                                .setAuthor(movTitle)
                                /*
                                * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                */
                                .setColor(0x5fbbfc)
                                .setDescription(movGenreArr.toString().replace(',', ', '))
                                .setFooter(movProduction)
                                /*
                                * Takes a Date object, defaults to current date.
                                */
                                .setTimestamp()
                                .setURL('http://www.imdb.com/title/' + ImdbId)
                                /*
                                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                                */
                                .addField('Year', movYear, true)
                                .addField('Rating', movImdbRating, true)
                                .addField('Runtime', movRuntime, true)
                                .addField('Language', movLanguage, true)
                                .addField('Plot', "Produced by " + movPlot, false)


                            message.channel.sendEmbed(embed);
                            //message.channel.sendMessage("**Title : **" + movTitle + "\n" + "**Year : **" + movYear + "\n" + "**Genre : **" + movGenreArr.toString()
                            //+ "\n" + "**Rating : **" + movImdbRating + "\n" + "**Runtime : **" + movRuntime + "\n" + 
                            //"**Language : **" + movLanguage + "\n" + "**Production : **" + movProduction + " (" + movWebsite + ")" + "\n" + 
                            //"**Plot : **" + movPlot + "\n" + movPoster);
                        }).catch(err => {message.channel.sendMessage("I can't find any movie named " )});

                    })
                });
        }).catch(err => {message.channel.sendMessage("I can't find anything named " + args + ".")});
    }
}

module.exports = movie;