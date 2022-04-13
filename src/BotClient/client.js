const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { ClientOptions, Collection, Invite } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { red } = require('colorette');
const fs = require('fs');
const { join } = require('path');
const YAML = require("yawn-yaml/cjs");

const ayar = new YAML(fs.readFileSync("./ayarlar.yaml").toString()).json;

module.exports = class BotClient extends AkairoClient {
    config = ayar;
    /**
     * @type { Collection<string, Invite> } invites
    */
    invites={};
    /**
     * @type { CommandHandler } commandHandler
     */
    commandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'Komutlar'),
        prefix: (message) => {
            return ayar.bot.prefix;
        },
        aliasReplacement: /-/g,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                modifyRetry: (_, str) => `${str}\n\nKomuttan çıkmak için \`iptal\` yazın...`,
                timeout: `Sanırım çok uzun sürdü, komut iptal edildi.`,
                ended: `3'ten fazla denemeye rağmen hala tam olarak anlayamadınız. Komut iptal edildi.`,
                cancel: `Komut iptal edildi.`,
                cancelWord: "iptal",
                retries: 3,
                time: 30000,
            },
            otherwise: '',
        },
    });

    listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'Eventler') });

    /**
     * 
     * @param { ClientOptions } options
     */
    constructor(options) {
        super({ ownerID: ayar.bot.sahipler }, {
            ...options
        });


        process.on('unhandledRejection', (err) => console.error(err));
    }


    async setup() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll()
        console.log(`Command handler yüklendi.`)
        this.listenerHandler.loadAll()
        console.log(`Event Handler yüklendi.`)
    }

    async start() {
        await this.setup();
        return this.login(ayar.bot.token).catch(() => console.log(red("Ayarlar.yaml' da geçerli bir token girmeniz gerekiyor.")))
    }

}

