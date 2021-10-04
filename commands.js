const { createEmbed, getRndmLine } = require("./utils/helpers");
const constants = require("./utils/constants");
const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        howto: "`help`",
        decsr: "Literally shows this message",
        run: (cmd, msg) => {
            console.log('test');
            // return createEmbed(
            //     msg.author,
            //     cmd,
            //     "Okay it seems that you're too stupid to use me. Let me break it down to you:",
            //     null,
                // Object.keys(this).map((key) => {
                //     return { name: this[key].howto, value: this[key].descr }
                // })
            // )
            const m = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(msg.author)
            .setAuthor(msg.author, msg.author.avatarURL(), null)
            .setDescription("test");
            console.log(m);
        }
    },
    char: {
        howto: "`char <dio, yoshikage, jotaro>`",
        descr: "Prints a random line of the given character",
        run: (character, msg) => {
            return msg.channel.send({
                embed: 
                    createEmbed(
                        msg.author, 
                        character, 
                        getRndmLine(constants[character]), 
                        "https://i.imgur.com/bZIqHDI.png")});
        }
    },
    play: {
        howto: "`play <yt url>`",
        descr: "Play some music with the given url from YouTube",
        run: (distube, cmd, msg) => {
                if (cmd[1].includes("www.youtube.com")) {
                    return distube.play(msg, cmd[1]);
                } else {
                    return message.channel.send("Gimme a proper link dumbass!");
                }
            }
    },
    skip: {
        howto: "`skip`",
        descr: "Skip the current song",
        run: (distube, msg) => {
            msg.channel.send("Star platinum! Skip this song!");
            if(distube.queue) return distube.skip(msg);
        }
    },
    stop: {
        howto: "`stop`",
        desr: "Disconnect the bot",
        run: (msg) => {
            return msg.member.voice.channel.leave()
        }
    }
}