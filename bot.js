// Some relevant imports
const { Client, Intents} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const dotenv = require('dotenv');
const constants = require('./utils/constants');
const { createEmbed } = require("./utils/helpers");
const commands = require('./commands');
const momentjs = require('moment');

// Instantiating bot and distube
dotenv.config();
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});
const distube = new DisTube(bot, { 
    searchSongs: 1,
    emitNewSongOnly: true, 
    leaveOnEmpty: true, 
    plugins: [new SpotifyPlugin()]
 })

// Bot going online
bot.on("ready", () => {
    console.log('Yare yare daze.. You are connected!');
});

// Main switch statement for execution fo commands
bot.on("message", async (message) => {
    if (message.content.substring(0, constants.suffix.length) === constants.suffix) {
        let listOfCommand = message.content.substring(constants.suffix.length + 1).split(" ");
        message.delete();
        var cmd = [listOfCommand.shift(), listOfCommand.join()];
        const executingCommand = commands[cmd[0]];
        if (executingCommand) {
            await executingCommand.run({distube: distube, cmd: cmd, msg: message});
        } else {
            message.channel.send(`What the fuck does ${cmd[0]} mean?`)
        }
    }
});

// Disable auto play from yt (fucking autplay cringe)
distube
    .on("initQueue", (queue) => {
        queue.autoplay = false;
    })
    .on("addSong", (queue, song) => {
        let queueList = '';
        let timeUntil = 0;
        queue.songs.forEach((currSong, i) => {
            queueList += (i == 0 ? '**Now playing: **' : `*${i}. `) + currSong.name + '*\n';
            timeUntil += i != 0 ? currSong.duration : 0;
        })
        queue.textChannel.send({
            embed: 
                createEmbed({
                    user: song.user,
                    title: 'Current queue',
                    content: queueList
                })
                .addField('\u200B', '\u200B')
                .addField('Time until next song', momentjs.utc(timeUntil*1000).format('HH:mm:ss'))
            })
    })
    .on("playSong", (queue, song) => {
        queue.textChannel.send({
            embed: 
                createEmbed({
                    user: song.user,
                    title: 'Now playing',
                    content: song.name
                })
                .setThumbnail(song.thumbnail)
            })
    })

bot.login(process.env.DISCORD_KEY);