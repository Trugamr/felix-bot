const commando = require('discord.js-commando');
const omdb = require('omdbapi');

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
                            console.log(res);
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
                        tvPoster = res.poster,
                        tvImdbRating = res.imdbrating,
                        tvTotalSeasons = res.totalseasons;
                    var tvGenreArr = new Array();
                    for(var i = 0; i < 3; i++) {
                        tvGenreArr[i] = res.genre[i];
                    }
                                         
                    message.channel.sendMessage("**Title : **" + tvTitle + "\n" + "**Year : **" + tvYear + "\n" + "**Genre : **" + tvGenreArr.toString()
                     + "\n" + "**Rating : **" + tvImdbRating + "\n" + "**Runtime : **" + tvRuntime + "\n" + 
                    "**Language : **" + tvLanguage + "\n" + 
                    "**Seasons : **" + tvTotalSeasons + "\n" + "**Plot : **" + tvPlot + "\n" + tvPoster);
                        })

                    })
                });
        }
    )}
}

module.exports = series;