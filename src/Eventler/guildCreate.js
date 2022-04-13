const { Listener } = require('discord-akairo');
const { GuildMember, Invite } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("guildCreate", {
            emitter: "client",
            event: "guildCreate",
            category: "client"
        })
    }
    /**
     * 
     * @param { GuildMember } member 
     */
    async exec(member) {
        const invites = await member.guild.invites.fetch();
        client.davetler[member.guild.id]=invites;
    }
}
