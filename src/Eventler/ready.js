const { Listener } = require('discord-akairo');
const { green } = require('colorette');

module.exports = class extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }
    async exec() {

        const client = this.client;
        async function backupInvite() {
            client.guilds.cache.forEach(async (guild) => {
                const invites = await guild.invites.fetch().catch(() => null);
    
                client.invites[guild.id]=invites;
            });  
        };

       await backupInvite();
        
        this.client.user.setPresence({ activities: [{ name: this.client.config.bot["aktiviteAdı"], type: this.client.config.bot["aktivite"] }], status: this.client.config.bot.durum })
        console.log(green(`[${this.client.user.id}] ${this.client.user.tag} Aktif!`))

    }
}
