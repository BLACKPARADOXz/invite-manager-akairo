const { Command } = require('discord-akairo');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class extends Command {
  constructor() {
        super('Ping', {
            aliases: ["ping"]
        });
    }

    /**
     * @param { Message } message 
     */
    async exec(message) {
        const msg = await message.channel.send({ embeds: [new MessageEmbed()
        .setDescription("*Pingleniyor*")]});
    
        msg.edit({ embeds: [new MessageEmbed()
        .setDescription(`ā 76ms\n\nš ${message.client.ws.ping}ms`)] })
    }
}