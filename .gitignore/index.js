const Discord = require('discord.js');

const bot = new Discord.Client();

var commande;

var prefix = "dw";


bot.on('ready', () => {
    console.log("Bot Ready")
});

bot.login(process.env.TOKEN); //;)




bot.on('guildMemberAdd', member => {
    member.guild.channels.get('513387034505904148').send(member.user + 'à rejoins le serveur' + member.guild.memberCount)
    console.log("rejoin")
});

bot.on('guildMemberRemove', member => {
    member.guild.channels.get('513387034505904148').send(member.user + 'à quitter le serveur' + member.guild.memberCount)
    console.log("quitte")
});

//Kick

bot.on('message', message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let str = message.content

    if (args[0].toLocaleLowerCase() === prefix + 'kick') {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Vous n'avez pas mentionne le nom du joueur")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick ce joueur")
        if (!member.kickable) return message.channel.send("Vous ne pouvez pas kick ce joueur")
        member.kick()
        message.channel.send(member.user.username + 'a été exclu')
        message.guild.channels.get('522504012222955521').send('**KICK** ' + str.substr(6))
    }
});

//Ban

bot.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let str = message.content
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande ")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Vous n'avez pas mentionne le nom du joueur")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous n'avez pas la permission de bannir ce joueur")
       if (!member.bannable) return message.channel.send("Vous ne pouvez pas bannir ce joueur")
       message.guild.ban(member, {days: 7})
       message.channel.send("**" + member.user.username + 'a ete ban')
       let str = message.content
       message.guild.channels.get('522504012222955521').send('**BAN** ' + str.substr(5))
       
    }
});


//Clear

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let str = message.content

    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer le nombre de message a supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count > 50) return message.channel.send("Veuillez entrer un nombre plus petit")
        message.channel.bulkDelete(parseInt(count) + 1)

    }
});

//Mute

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.reply("Vous n'avez pas la permission d'executer cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Joueur introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.reply("Vous n'avez pas la permission de mute ce joueur")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.reply("Vous ne pouvez pas mute ce joueur")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
            member.addRole(muterole)
            message.channel.send(member + ' a ete mute')
			message.guild.channels.get('522504012222955521').send('**MUTE** ' + str.substr(6))
        }

    
});


//DeMute


bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "demute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'executer cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Joueur introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.reply("Vous ne pouvez pas la permission de demute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.reply("Vous ne pouvez pas demute ce joueur")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
            member.removeRole(muterole)
            message.channel.send(member + ' a ete demute')
			message.guild.channels.get('522504012222955521').send('**DEMUTE** ' + str.substr(8))
        
    }
});

//Creation grade pour systeme de mute

bot.on("message", message => {

    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if ((args[0].toLowerCase() === prefix + "muted")) {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.reply("Vous n'avez pas la permission d'executer cette commande ")
        message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
            message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                channel.overwritePermissions(role, {
                    SEND_MESSAGES: false
                })

               })
            })
        }
    
});

//Report

bot.on("message", message => {

    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let str = message.content

    if ((args[0].toLowerCase() === prefix + "report")) {
        let member = message.mentions.members.first()
        if (!member) return message.channel.reply("Joueur introuvable")
        message.guild.channels.get('528677822844239888').send('@everyone ' +str.substr(8))

    }
});

//Annonces




