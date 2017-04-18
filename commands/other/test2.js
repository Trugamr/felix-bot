const commando = require('discord.js-commando');
const omdb = require('omdbapi');

var fiveRes = new Array();

class test2 extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test2',
            group: 'other',
            memberName: 'test2',
            description: 'test2'
        });
    }

    async run(message, args) {
        omdb.search({
            search: args,  // required
            type: "movie",             // optionnal  ['series', 'episode', 'movie']
            //year: '2011',               // optionnal
            //page: '1'                   // otionnal (1 to 100)
        }).then(res => {         
            for(var i = 0; i < 5; i++) {
                fiveRes[i] ="**" + (i+1) + ".** " + res[i].title + " (" + res[i].year + ")";
            }
            message.channel.sendMessage(fiveRes).then(() => {
                message.channel.awaitMessages(response => response.content < 6 , {
                        max: 1,
                        time: 10000,
                        errors: ['time']
                    })
                    .then((collected) => {
                        var coll = collected.first().content;
                        if(coll > 5 || coll < 1) {
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
                        }).catch(error => {message.channel.sendMessage("I can't find any movie named " + args)});

                    })
                });
        }
    )}
}

module.exports = test2;