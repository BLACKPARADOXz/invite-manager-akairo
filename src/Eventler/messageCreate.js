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

        const prefix_role = this.client.config.bot.special_role_prefix;
        if(message.content.startsWith(prefix_role)) {
            const args = message.content.trim().slice(1).split(/ +/g);
            const cmd = args[0];

            const res = await pre.findOne({ guild_id: message.guild.id, name: cmd });

           // console.log(res,"AMK")

            if(res) {
                const members = args.slice(1).map(str => this.client.util.resolveMember(str,message.guild.members.cache)).filter(elem => elem != null);

                if(members.length) {

                    let faileds = 0;

                        if(members.length == 1) {
                            members[0].roles.add(res.roles).catch(() => {
                                faileds+=1;
                            });
                        } else {
                            members.forEach(mem => {
                                mem.roles.add(res.roles).catch(() => {
                                    faileds+=1;
                                })
                            });
                        }

                        console.log(faileds,"SOREN GA NANDA")

                        let str = members.length > 0 ? `${members[0]} üyesine roller verildi` : `${members.length} üyeye rol verildi`;
                       
                        if(faileds) {
                            str+=`, ${faileds} başarısız`;
                        }
                        message.channel.send(str);
                }
            }
    
        }

        if(new RegExp(`<@!?${this.client.user.id}>`).test(message.content)) {
            message.reply(`Prefixim \`${this.client.config.bot.prefix}\``)
        };

    }
}