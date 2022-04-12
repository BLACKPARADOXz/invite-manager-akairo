const { Listener } = require('discord-akairo');
const { GuildMember, Invite } = require('discord.js');

module.exports = class extends Listener {
    constructor() {
        super("guildMemberAdd", {
            emitter: "client",
            event: "guildMemberAdd",
            category: "client"
        })
    }
    /**
     * 
     * @param { GuildMember } member 
     */
    async exec(member) {

        const value = this.client.config.server.invite_log_channel;
        let logId = value;
        
        if(Array.isArray(value)) {
            const obj = value.find(obj => obj[member.guild.id]);

            if(obj) {
                logId = obj[member.guild.id];
            }
        };

        if(logId) {

            const old_invites = this.client.invites[member.guild.id];
            const updated_invites = await member.guild.invites.fetch();
            
            const invite = updated_invites.find(inv => {
                const old_invite = old_invites.get(inv.code);

                return old_invite && inv.uses > old_invite.uses; 
            });


            /*
            let vanish = false;

            if(!invite) {
                vanish=true;
            }*/

            const log = member.guild.channels.cache.get(logId);


            if(log) {
                log.send(`📥 \`${member.user.tag}\` sunucuya **${invite.code}** koduyla ${invite ? `tarafından \`${invite.inviter.tag}\`` : "" } davet edildi`);
            }


        }

    }
}
