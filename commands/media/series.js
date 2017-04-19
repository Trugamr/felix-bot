const commando = require('discord.js-commando');
const omdb = require('omdbapi');
const Discord = require('discord.js');

var fiveRes = new Array();

class series extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'series',
            group: 'media',
            memberName: 'series',
            description: 'Grabs Series Info from Open Movie Database.'
        });
    }

    async run(message, args) {
        if(args == null || args == "") { message.channel.sendMessage("use** .series** **[search]**"); return; }
        omdb.search({
            search: args,                   // required
            type: "series",                  // optionnal  ['series', 'episode', 'movie']
            //year: '2011',                 // optionnal
            //page: '1'                     // otionnal (1 to 100)
        }).then(res => { 
            console.log(res);      
            for(var i = 0; i < 5; i++) {
                try {
                fiveRes[i] ="**" + (i+1) + ".** " + res[i].title + " (" + res[i].year + ")";
                } catch(err) {
                   fiveRes[i]  = "";
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
                            
                        var tvTitle = res.title,
                        tvYear = res.year,
                        tvRated = res.rated,
                        tvReleased = res.released,
                        tvRuntime = res.runtime,
                        tvGenre = res.genre[0],
                        tvDirector = res.director,
                        tvPlot = res.plot,
                        tvLanguage = res.language,
                        tvCountry = res.country,
                        tvAwards = res.awards,
                        tvPoster = res.poster.replace("SX300", "SX1000"),
                        tvImdbRating = res.imdbrating,
                        tvTotalSeasons = res.totalseasons,
                        tvStatus;
                    if(tvYear.toString().length == "5") {
                        tvStatus = "Continuing";
                    } else { tvStatus = "Ended"; }
                    var tvGenreArr = new Array();
                    for(var i = 0; i < 3; i++) {
                        tvGenreArr[i] = res.genre[i];
                    }
                    const embed = new Discord.RichEmbed()
                                .setImage(tvPoster.replace("SX300", "SX1000"))
                                .setAuthor(tvTitle)
                                /*
                                * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                */
                                .setColor(0xff4c4c)
                                .setDescription(tvGenreArr.toString().replace(',', ', '))
                                .setFooter(tvAwards)
                                /*
                                * Takes a Date object, defaults to current date.
                                */
                                .setTimestamp()
                                .setURL('http://www.imdb.com/title/' + ImdbId)
                                /*
                                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                                */
                                .addField('Released', tvReleased, true)
                                .addField('Status', tvStatus,true)
                                .addField('Rating', tvImdbRating, true)
                                .addField('Runtime', tvRuntime, true)
                                .addField('Seasons', tvTotalSeasons, true)
                                .addField('Language', tvLanguage, true)
                                .addField('Plot', tvPlot, false)


                            message.channel.sendEmbed(embed);
                                         
                    //message.channel.sendMessage("**Title : **" + tvTitle + "\n" + "**Year : **" + tvYear + "\n" + "**Genre : **" + tvGenreArr.toString()
                    //+ "\n" + "**Rating : **" + tvImdbRating + "\n" + "**Runtime : **" + tvRuntime + "\n" + 
                    //"**Language : **" + tvLanguage + "\n" + 
                    //"**Seasons : **" + tvTotalSeasons + "\n" + "**Plot : **" + tvPlot + "\n" + tvPoster);
                        })

                    })
                });
        }).catch(err => {message.channel.sendMessage("I can't find anything named " + args + ".")});
    }
}

module.exports = series;