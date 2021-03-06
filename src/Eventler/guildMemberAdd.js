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
        
        //Ayarlar.yaml'daki invite_log_channel değerini ayrıştırma kısmı
        if(Array.isArray(value)) {
            const obj = value.find(obj => obj[member.guild.id]);

            if(obj) {
                logId = obj[member.guild.id];
            }
        };

        if(logId) {

            const old_invites = this.client.invites[member.guild.id];
            const updated_invites = await member.guild.invites.fetch();
            
            //Davetlerin önceki haliyle güncel halinin karşılaştırılması yapılarak kullanılan davet bulunur
            const invite = old_invites ? updated_invites.find(inv => {
                const old_invite = old_invites.get(inv.code);

                return old_invite && inv.uses > old_invite.uses; 
            }) : null;

            const log = member.guild.channels.cache.get(logId);

            if(log) {
                log.send(`📥 \`${member.user.tag}\` sunucuya **${invite ? invite.code : member.guild.vanityURLCode}** koduyla ${invite ? `tarafından \`${invite.inviter.tag}\`` : "" } davet edildi`);
            }


        }

    }
}
