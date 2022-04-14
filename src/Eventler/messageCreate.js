const { Listener } = require('discord-akairo');
const { Message } = require('discord.js');
const pre = require('../Models/tagSchema');

module.exports = class extends Listener {
    constructor() {
        super("messageCreate", {
            emitter: "client",
            event: "messageCreate",
            category: "client"
        })
    }
    /**
     * @param { Message } message 
     */
    async exec(message) {

        if(!message.channel) return; 

        if(new RegExp(`<@!?${this.client.user.id}>`).test(message.content)) {
            message.reply(`Prefixim \`${this.client.config.bot.prefix}\``)
        };

    }
}
