// Some relevant imports
const { Client, Intents} = require('discord.js');
const DisTube = require('distube');
const dotenv = require('dotenv');
const constants = require('./utils/constants');
const commands = require('./commands');

// Instantiating bot and distube
dotenv.config();
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true, leaveOnEmpty: true })

// Bot going online
bot.on("ready", () => {
    console.log('Yare yare daze.. You are connected!');
});

// Main switch statement for execution fo commands
bot.on("message", (message) => {
    if (message.content.substring(0, constants.suffix.length) === constants.suffix) {
        var cmd = message.content.substring(5).split(' ');
        const test = commands[cmd[0]];
        test.run(cmd, message);
    }
});

// Disable auto play from yt (fucking autplay cringe)
distube
    .on("initQueue", (queue) => {
        queue.autoplay = false;
    });

bot.login(process.env.DISCORD_KEY);