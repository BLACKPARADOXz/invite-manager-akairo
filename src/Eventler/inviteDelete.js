const { Listener } = require('discord-akairo');
const { Invite } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("inviteDelete", {
            emitter: "client",
            event: "inviteDelete",
            category: "client"
        })
    }
    /**
     * 
     * @param { Invite } invite 
     */
    async exec(invite) {
        this.client.invites[invite.guild.id].delete(invite.code);
    }
}
