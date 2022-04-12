const { Listener } = require('discord-akairo');
const { Invite } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("inviteCreate", {
            emitter: "client",
            event: "inviteCreate",
            category: "client"
        })
    }
    /**
     * 
     * @param { Invite } invite 
     */
    async exec(invite) {
        this.client.invites[invite.guild.id].set(invite.code,invite);
    }
}
