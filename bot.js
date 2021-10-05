// Some relevant imports
const { Client, Intents} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const dotenv = require('dotenv');
const constants = require('./utils/constants');
const commands = require('./commands');

// Instantiating bot and distube
dotenv.config();
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});
const distube = new DisTube(bot, { 
    emitNewSongOnly: true, 
    leaveOnEmpty: true, 
    leaveOnFinish: true,
    plugins: [new SpotifyPlugin()]
 })

// Bot going online
bot.on("ready", () => {
    console.log('Yare yare daze.. You are connected!');
});

// Main switch statement for execution fo commands
bot.on("message", (message) => {
    if (message.content.substring(0, constants.suffix.length) === constants.suffix) {
        let listOfCommand = message.content.substring(constants.suffix.length + 1).split(" ");
        var cmd = [listOfCommand.shift(), listOfCommand.join()];
        const executingCommand = commands[cmd[0]];
        executingCommand.run({distube: distube, cmd: cmd, msg: message});
    }
});

// Disable auto play from yt (fucking autplay cringe)
distube
    .on("initQueue", (queue) => {
        queue.autoplay = false;
    })

bot.login(process.env.DISCORD_KEY);