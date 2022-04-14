const { Listener } = require('discord-akairo');
const { GuildMember, Invite } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("guildDelete", {
            emitter: "client",
            event: "guildDelete",
            category: "client"
        })
    }
    /**
     * 
     * @param { GuildMember } member 
     */
    async exec(member) {
        delete client.davetler[member.guild.id];
    }
}
