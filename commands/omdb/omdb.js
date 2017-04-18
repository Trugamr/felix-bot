const commando = require('discord.js-commando');
const omdb = require('omdbapi');

class omdbInfo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'omdb',
            group: 'omdb',
            memberName: 'omdb',
            description: 'Movies and TV Info.'
        });
    }

    async run(message, args) {
        var allArgs = args.split(" ");
        var typeArg = allArgs[0].toString().replace(" ", "").toLowerCase(),
            searchArg = args.toString().replace(allArgs[0] + " ", "");
        if(typeArg != "movie"){
            if(typeArg != "series") {
                message.channel.sendMessage("omdb command usage : [p]omdb **[type]** **[title]**" + "\n" + "**type : ** movie or series \n");
                return;
            }
        }
        omdb.search({
            search: searchArg,  // required
            type: typeArg,             // optionnal  ['series', 'episode', 'movie']
            //year: '2011',               // optionnal
            //page: '1'                   // otionnal (1 to 100)
        }).then(res => {
            var Title = res[0].title,
                Year = res[0].year,
                ImdbId = res[0].imdbid,
                Poster = res[0].poster;
            
            if(typeArg == "movie") {
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
                }).catch(error => {message.channel.sendMessage("I can't find any " + typeArg + " named " + searchArg)});

            } else if(typeArg == "series") {
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
                }).catch(error => {message.channel.sendMessage("I can't find any " + typeArg + " named " + searchArg)});
            }
            
            //message.channel.sendMessage("**RESPONSE**" + "\n" + Title + "\n" + Year + "\n" + ImdbId + "\n" + Poster + "\n");
            
        }).catch(console.error);        
    }
}

module.exports = omdbInfo;