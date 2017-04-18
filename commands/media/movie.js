const commando = require('discord.js-commando');
const omdb = require('omdbapi');

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
            console.log(res);
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
                                movWebsite = res.website.replace("http://", "");
                            var movGenreArr = new Array();
                            for(var i = 0; i < 3; i++) {
                                movGenreArr[i] = res.genre[i];
                            }
                            
                            message.channel.sendMessage("**Title : **" + movTitle + "\n" + "**Year : **" + movYear + "\n" + "**Genre : **" + movGenreArr.toString()
                            + "\n" + "**Rating : **" + movImdbRating + "\n" + "**Runtime : **" + movRuntime + "\n" + 
                            "**Language : **" + movLanguage + "\n" + "**Production : **" + movProduction + " (" + movWebsite + ")" + "\n" + 
                            "**Plot : **" + movPlot + "\n" + movPoster);
                        }).catch(err => {message.channel.sendMessage("I can't find any movie named " )});

                    })
                });
        }
    )}
}

module.exports = movie;