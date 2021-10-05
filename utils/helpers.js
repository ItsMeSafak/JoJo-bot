const { MessageEmbed } = require('discord.js');

module.exports = {
    createEmbed(params) {
        return new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(params.title)
            .setAuthor(params.user.username, params.user.avatarURL(), null)
            .setDescription(params.content)
            .setImage(params.image);
    },

    getRndmLine(list){
        return list[Math.floor(Math.random() * list.length)]
    }
}