const { Client, Intents} = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv');
const DisTube = require('distube');

dotenv.config();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true })

//Help List
var helpCommand = "jojo";
var commands = ["`yoshikage`", "`yio`", "`jotaro`"];
var explanation = "Yare yare.. So you wanna make use of me? Just type in `" + helpCommand + "` followed by a command from below.\n\n" +
    "These are my commands:\n" + commands;

//Command values
var kiraList = ["My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. " +
    "I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. " +
    "I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. " +
    "After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. " +
    "Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. " +
    "I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night." +
    " That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.", "KILLER QUEEEEEN! BITEESSS ZAAA DUSTOOO", "I-I'm having an erection..!"];
var dioList = ["Oh? You're Approaching Me?", "WRYYYYYYYYYYY!!!", "MUDA MUDA MUDA MUDAAAAAAA!!", "ZA WARUDO!", "But it was me, Dio!", "8 seconds have passed."];
var jotaroList = ["Yare yare daze...", "ORA ORA ORA ORA ORRRAAAA!!", "Star Platinum! Za Warudo!", "I can't beat the shit out of you without getting closer."];


// Music queue
var musicQueue = [];
var isPlaying = false;

function createEmbed(user, name, content, image) {
    return new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(name)
        .setAuthor(user.username, user.avatarURL(), null)
        .setDescription(content)
        .setImage(image);
}

function getRndmLine(list){
    return list[Math.floor(Math.random() * list.length)]
}

// function playAudio(message, connection) {
//     let stream;
//     if (!isPlaying) {
//         let link = musicQueue.shift();
//         stream = connection.play(ytdl(link, {filter: "audioonly"}));
//         isPlaying = true;
//         stream.on("finish", () => {
//             if (musicQueue.length > 0){
//                 playAudio(message, connection);
//             } else {
//                 isPlaying = false;
//             }
//         })
//     } else {
//         message.channel.send("Wait you for your turn dumb fuck...");
//     }
// }

//Bot going online
bot.on("ready", (evt) => {
    console.log('Yare yare daze.. You are connected!');
});

// //Main switch statement for execution fo commands
bot.on("message", (message) => {
    if (message.content.substring(0, 4) === helpCommand) {
        var cmd = message.content.substring(5).split(' ');
        switch (cmd[0]) {
            case 'yoshikage':
                message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(kiraList), "https://i.imgur.com/bZIqHDI.png")});
                break;
            case 'dio':
                message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(dioList), "https://i.imgur.com/sOKL0w5.png")});
                break;
            case 'jotaro':
                message.channel.send({ embed: createEmbed(message.author, cmd, getRndmLine(jotaroList), "https://i.imgur.com/5jhSZbh.jpeg")});
                break;
            case 'play':
                if (cmd[1].includes("www.youtube.com")) {
                    distube.play(message, cmd[1]);
                //     musicQueue.push(cmd[1]);
                //     let channel = message.member.voice.channel;
                //     channel.join().then((conn) => {
                //         playAudio(message, conn);
                //     })
                } else {
                    message.channel.send("Gimme a proper link dumbass!");
                }
                break;
            case 'skip':
                message.channel.send("Star platinum! Skip this song!");
                distube.skip(message);
                break;
            case 'stop':
                message.member.voice.channel.leave();
                break;
            case 'help':
                message.channel.send(explanation);
                break;
            default:
                message.channel.send(`What the fuck does '${cmd[0]}' mean?`);
                break;
        }
    }
});

bot.login(process.env.DISCORD_KEY);
