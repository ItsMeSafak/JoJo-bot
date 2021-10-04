const { MessageEmbed } = require('discord.js');

module.exports = {
    createEmbed(user, name, content, image = null, fields) {
        return new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(name)
            .setAuthor(user.username, user.avatarURL(), null)
            .setDescription(content)
            .addFields(fields)
            .setImage(image);
    },

    getRndmLine(list){
        return list[Math.floor(Math.random() * list.length)]
    }
}