const { createEmbed, getRndmLine } = require("./utils/helpers");
const constants = require("./utils/constants");

module.exports = {
    help: {
        howto: "`help`",
        descr: "Literally shows this message",
        run: (params) => {
            const commandFields = Object.keys(module.exports).map((key) => {
                return { name: module.exports[key].howto, value: module.exports[key].descr }});
            return params.msg.channel.send({embed: createEmbed({
                user: params.msg.author,
                title: params.cmd,
                content: "Okay it seems that you're too stupid to use me. Let me break it down to you: \ \ "
            }).addFields(commandFields)});
        }
    },
    char: {
        howto: "`char <dio, yoshikage, jotaro>`",
        descr: "Prints a random line of the given character",
        run: (params) => {
            return params.msg.channel.send({
                embed: 
                    createEmbed({
                        user: params.msg.author, 
                        title: params.cmd[1], 
                        content: getRndmLine(constants[params.cmd[1]]), 
                        image: "https://i.imgur.com/bZIqHDI.png"})});
        }
    },
    play: {
        howto: "`play <yt url>`",
        descr: "Play some music with the given url from YouTube",
        run: async (params) => {
                return await params.distube.play(params.msg, params.cmd[1]);
            }
    },
    skip: {
        howto: "`skip`",
        descr: "Skip the current song",
        run: async (params) => {
            params.msg.channel.send("Star platinum! Skip this song!");
            return await params.distube.skip(params.msg);
        }
    },
    stop: {
        howto: "`stop`",
        descr: "Disconnect the bot",
        run: (params) => {
            return params.distube.stop(params.msg);
        }
    }
}