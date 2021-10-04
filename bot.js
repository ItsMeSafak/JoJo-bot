// Some relevant imports
const { Client, Intents} = require('discord.js');
const dotenv = require('dotenv');
const DisTube = require('distube');
const constants = require('./utils/constants');
const commands = require('./commands');
const { getRndmLine, createEmbed } = require('./utils/helpers');

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

        // switch (cmd[0]) {
        //     case 'yoshikage':
        //         message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(constants.kiraList), "https://i.imgur.com/bZIqHDI.png")});
        //         break;
        //     case 'dio':
        //         message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(constants.dioList), "https://i.imgur.com/sOKL0w5.png")});
        //         break;
        //     case 'jotaro':
        //         message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(constants.jotaroList), "https://i.imgur.com/5jhSZbh.jpeg")});
        //         break;
        //     case 'play':
        //         if (cmd[1].includes("www.youtube.com")) {
        //             distube.play(message, cmd[1]);
        //         } else {
        //             message.channel.send("Gimme a proper link dumbass!");
        //         }
        //         break;
        //     case 'skip':
        //         message.channel.send("Star platinum! Skip this song!");
        //         if(distube.queue) distube.skip(message);
        //         break;
        //     case 'stop':
        //         message.member.voice.channel.leave();
        //         break;
        //     case 'help':
        //         message.channel.send("Help yourself n00b");
        //         break;
        //     default:
        //         message.channel.send(`What the fuck does '${cmd[0]}' mean?`);
        //         break;
        // }
    }
});

distube
    .on("initQueue", (queue) => {
        queue.autoplay = false;
    });

bot.login(process.env.DISCORD_KEY);