const commando = require('discord.js-commando');
const Discord = require('discord.js');

const embed = new Discord.RichEmbed()
  .setImage('https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2Mzg2NDMzNl5BMl5BanBnXkFtZTgwMjcwODUzOTE@._V1_SX3000.jpg')
  .setAuthor('Kubo and the Two Strings')
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription('(Animation, Adventure, Family)')
  .setFooter('Produced by Focus Features')
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('http://www.imdb.com/title/tt4302938')
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField('Year', '2016', true)
  .addField('Rating', '7.9', true)
  .addField('Runtime', '101 min', true)
  .addField('Language', 'English', true)
  .addField('Plot', 'lorem ipsum dolor sit emet lorem ipsum dolor sit emet lorem ipsum dolor sit emet lorem ipsum dolor sit emet lorem ipsum dolor sit emet .', false)

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
        message.channel.sendEmbed(embed);
    }
}

module.exports = test;